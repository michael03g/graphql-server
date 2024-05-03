import AppDataSource from "../typeorm.config";
import { User } from "../entities/User";
import { Facility } from "../entities/Facility";
import { Location } from "../entities/Location";

export const createMockData = async () => {
  const facility = new Facility();
  facility.name = "testfacility";
  await AppDataSource.manager.save(facility);

  const user = new User();
  user.firstName = "firstName";
  user.lastName = "lastname";
  user.email = "test@gmail.com";
  user.role = "Doctor";
  user.facilities = [facility];
  await AppDataSource.manager.save(user);

  const location = new Location();
  location.address = "testaddress";
  location.state = "teststate";
  location.zip = "testzip";
  location.facility = facility;
  await AppDataSource.manager.save(location);

  return { userId: user.id, facilityId: facility.id, locationId: location.id };
};

export const cleanUpMockData = async (
  userId: string,
  facilityId: string,
  locationId: string
) => {
  const user = await AppDataSource.manager.findOneBy(User, { id: userId });
  await AppDataSource.manager.remove(user);

  const location = await AppDataSource.manager.findOneBy(Location, {
    id: locationId,
  });
  await AppDataSource.manager.remove(location);

  const facility = await AppDataSource.manager.findOneBy(Facility, {
    id: facilityId,
  });
  await AppDataSource.manager.remove(facility);
};

export const getUserQueryData = (userId: string) => {
  const queryData = {
    query: `query Query($userId: String) {
      user(id: $userId) {
        createdAt
        email
        firstName
        lastName
        role
        id
        facilities {
          createdAt
          id
          locations {
            address
            id
            state
            zip
          }
          name
        }
      }
    }`,
    variables: { userId },
  };
  return queryData;
};

export const getUserByLocationQueryData = (locationId: string) => {
  const queryData = {
    query: `query Query($usersByLocationId: String) {
      usersByLocation(id: $usersByLocationId) {
        address
        id
        state
        zip
        facility {
          createdAt
          id
          name
        }
        users {
          createdAt
          email
          firstName
          id
          lastName
          role
        }
      }
    }`,
    variables: { usersByLocationId: locationId },
  };
  return queryData;
};
