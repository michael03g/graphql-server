import AppDataSource from "../typeorm.config";
import { User } from "../entities/User";
import { getFacilityByIds } from "./facililty.controller";

export const getUserById = async (id: string) => {
  const user = await AppDataSource.createQueryBuilder()
    .select("user")
    .from(User, "user")
    .leftJoinAndSelect("user.facilities", "facilities")
    .leftJoinAndSelect("facilities.locations", "locations")
    .where("user.id = :id", { id: id })
    .getOne();
  return user;
};

export const getUserByIds = async (ids: string[]) => {
  const users = await AppDataSource.createQueryBuilder()
    .select("user")
    .from(User, "user")
    .where("user.id in (:...ids)", { ids: ids })
    .getMany();
  return users;
};

export const addUser = async (
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  facilityIds?: string[]
) => {
  const newUser = new User();
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.email = email;
  newUser.role = role;

  if (facilityIds) {
    const facilities = await getFacilityByIds(facilityIds);
    newUser.facilities = facilities;
  }

  await AppDataSource.manager.save(newUser);

  return await getUserById(newUser.id);
};
