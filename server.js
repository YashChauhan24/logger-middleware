import express from "express";
import mongoose from "mongoose";
import router from "./Routes/User.routes.js";
import { loggerMiddleware } from "./Middleware/loggerMiddleware.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(loggerMiddleware);

app.use("/api/adminUser", router);

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DATABASE_NAME,
    autoIndex: true,
  })
  .then(async () => {
    console.log("MongoDB successfully connected.");
  })
  .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
