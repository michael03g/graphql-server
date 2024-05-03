import { gql } from "apollo-server-express";

const Schema = gql`
  type Location {
    id: String!
    state: String!
    zip: String!
    address: String!
  }

  type Facility {
    id: String!
    name: String!
    createdAt: String!
    locations: [Location]
  }

  type User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    createdAt: String!
    facilities: [Facility]
  }

  type Location {
    id: String!
    state: String!
    zip: String!
    address: String!
    facility: Facility
    users: [User]
  }

  type Query {
    user(id: String): User
    usersByLocation(id: String): Location
  }

  type Mutation {
    addUser(
      firstName: String
      lastName: String
      email: String
      role: String
      facilities: [String]
    ): User
    addFacility(name: String, users: [String], locations: [String]): Facility
    addLocation(
      state: String
      zip: String
      address: String
      facility: String
    ): Location
  }
`;

export default Schema;
