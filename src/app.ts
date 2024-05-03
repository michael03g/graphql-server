import express from "express";
import AppDataSource from "./typeorm.config";

const PORT = 4000;

AppDataSource.initialize();

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
