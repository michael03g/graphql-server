import { GraphQLError } from "graphql";

import { addUser, getUserById } from "./controllers/user.controller";
import {
  addLocation,
  getLocationById,
} from "./controllers/location.controller";
import {
  addFacility,
  getFacilityById,
} from "./controllers/facililty.controller";

const Resolvers = {
  Query: {
    user: async (_: any, { id }: any) => {
      try {
        const user = await getUserById(id);
        if (!user) {
          throw new Error("Invalid user id");
        }
        return user;
      } catch (error) {
        console.error("Error querying getUserById", error);
        throw new GraphQLError(error?.toString() ?? "", {
          extensions: { code: "Bad Request" },
        });
      }
    },

    usersByLocation: async (_: any, { id }: any) => {
      try {
        const location = await getLocationById(id);
        if (!location) {
          throw new Error("Invalid location id");
        }
        const facility = await getFacilityById(location?.facility.id ?? "");
        if (!facility) {
          throw new Error("Invalid facility id");
        }
        return {
          ...location,
          users: facility?.users,
        };
      } catch (error) {
        console.error("Error querying getLocationById", error);
        throw new GraphQLError(error?.toString() ?? "", {
          extensions: { code: "Bad Request" },
        });
      }
    },
  },

  Mutation: {
    addUser: async (
      _: any,
      { firstName, lastName, email, role, facilities }: any
    ) => {
      try {
        return await addUser(firstName, lastName, email, role, facilities);
      } catch (error) {
        console.error("Error creating a user", error);
        throw new GraphQLError(error?.toString() ?? "", {
          extensions: { code: "Bad Request" },
        });
      }
    },

    addFacility: async (_: any, { name, users, locations }: any) => {
      try {
        return await addFacility(name, users, locations);
      } catch (error) {
        console.error("Error creating a facility", error);
        throw new GraphQLError(error?.toString() ?? "", {
          extensions: { code: "Bad Request" },
        });
      }
    },

    addLocation: async (_: any, { state, zip, address, facility }: any) => {
      try {
        return await addLocation(state, zip, address, facility);
      } catch (error) {
        console.error("Error creating a location", error);
        throw new GraphQLError(error?.toString() ?? "", {
          extensions: { code: "Bad Request" },
        });
      }
    },
  },
};

export default Resolvers;
