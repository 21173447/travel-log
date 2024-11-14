import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import travelroutes from "./routes/travelroutes.js";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/travel", travelroutes);

// Start server and connect to DB
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
