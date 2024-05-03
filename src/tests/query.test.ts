import request from "supertest";

import { startApolloServer } from "../server";
import {
  createMockData,
  cleanUpMockData,
  getUserQueryData,
  getUserByLocationQueryData,
} from "./test.util";
import AppDataSource from "../typeorm.config";

let server: any;
let url: string;
let userId: string;
let facilityId: string;
let locationId: string;

beforeAll(async () => {
  ({ server, url } = await startApolloServer());
  ({ userId, facilityId, locationId } = await createMockData());
});

it("user query should work as expected", async () => {
  const response = await request(url).post("/").send(getUserQueryData(userId));
  const { id, facilities } = response.body.data?.user;
  expect(id).toBe(userId);
  expect(facilities[0].id).toBe(facilityId);
  expect(facilities[0]?.locations[0]?.id).toBe(locationId);
});

it("userbylocation query should work as expected", async () => {
  const response = await request(url)
    .post("/")
    .send(getUserByLocationQueryData(locationId));
  const { id, facility, users } = response.body.data?.usersByLocation;
  expect(id).toBe(locationId);
  expect(facility?.id).toBe(facilityId);
  expect(users[0]?.id).toBe(userId);
});

afterAll(async () => {
  await cleanUpMockData(userId, facilityId, locationId);
  await AppDataSource.destroy();
  await server?.stop();
});
