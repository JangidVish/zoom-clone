import env from "dotenv";
import express from "express";
import { createServer } from "node:http";

import mongoose from "mongoose";
import cors from "cors";
import connectToSocket from "./Controllers/socketManager.js";
import userRoutes from "./routes/user.route.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use("/api/v1/users", userRoutes);

const start = async () => {
  const connectionDB = await mongoose
    .connect(
      "mongodb+srv://vishaljangid2004as:Vishal@vishal.tlkuemw.mongodb.net/zoomClone?retryWrites=true&w=majority&appName=Vishal"
    )
    .then(() => {
      console.log("DB Connected Succeddfully");
    });

  server.listen(app.get("port"), () => {
    console.log("Listening on Port 8000");
  });
};

start();
