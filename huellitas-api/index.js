import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/mongo.config.js";
import routerPet from "./routes/pets.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.resolve("uploads")));

app.use("/api/pets", routerPet);

app.get("/", (req, res) => {
  res.send("funciona");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor funcionando en localhost:${PORT}`);
  });
});
