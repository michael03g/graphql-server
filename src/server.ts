import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";

import Schema from "./schema";
import Resolvers from "./resolvers";
import AppDataSource from "./typeorm.config";

export const startApolloServer = async () => {
  await AppDataSource.initialize();

  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: Schema,
    resolvers: Resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  }) as any;

  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );

  const url = `http://localhost:${PORT}${server.graphqlPath}`;
  console.log(`Server ready at ${url}`);

  return { server, url };
};
