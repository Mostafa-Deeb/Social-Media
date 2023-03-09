import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import PostRoutes from "./routes/posts.js";
import UserRoutes from "./routes/users.js";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", PostRoutes);
app.use("/user", UserRoutes);
const CONNECTION_URL =
  "mongodb+srv://Mostafa:memories123@cluster0.hgyyxjt.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.CONNECTION_URL || CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log("server running")))
  .catch((err) => console.log(err));
