import AppDataSource from "../typeorm.config";
import { getUserByIds } from "./user.controller";
import { getLocationByIds } from "./location.controller";
import { Facility } from "../entities/Facility";

export const getFacilityById = async (id: string) => {
  const facility = await AppDataSource.createQueryBuilder()
    .select("facility")
    .from(Facility, "facility")
    .leftJoinAndSelect("facility.users", "users")
    .where("facility.id = :id", { id: id })
    .getOne();
  return facility;
};

export const getFacilityByIds = async (ids: string[]) => {
  const facilities = await AppDataSource.createQueryBuilder()
    .select("facility")
    .from(Facility, "facility")
    .where("facility.id in (:...ids)", { ids: ids })
    .getMany();
  return facilities;
};

export const addFacility = async (
  name: string,
  userIds?: string[],
  locationIds?: string[]
) => {
  const newFacility = new Facility();
  newFacility.name = name;

  if (userIds) {
    const users = await getUserByIds(userIds);
    newFacility.users = users;
  }

  if (locationIds) {
    const locations = await getLocationByIds(locationIds);
    newFacility.locations = locations;
  }

  await AppDataSource.manager.save(newFacility);

  return newFacility;
};
