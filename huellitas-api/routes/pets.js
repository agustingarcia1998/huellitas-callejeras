import express from "express";
import { upload } from "../middlewares/upload.js";
import Pet from "../models/pets.js";
import fs from "fs";
import path from "path";

const routerPet = express.Router();

routerPet.post("/", upload.single("image"), async (req, res) => {
  console.log("archivo recibido", req.file);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  const filePath = req.file ? path.join("uploads", req.file.filename) : null;

  try {
    let { name, age, gender, weight, size, type } = req.body;

    if (!name || !age || !gender || !weight || !size || !type || !imagePath) {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // borra imagen si hay error de validacin
      }
      return res
        .status(400)
        .json({ error: "Se deben completar todos los campos" });
    }

    name = capitalizeFirstLetter(name);
    gender = capitalizeFirstLetter(gender);
    size = capitalizeFirstLetter(size);
    type = capitalizeFirstLetter(type);

    const existingPet = await Pet.findOne({ name, type });
    if (existingPet) {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return res.status(400).json({ error: "La mascota ya fue registrada" });
    }

    const newPet = new Pet({
      name,
      age,
      image: imagePath,
      gender,
      weight,
      size,
      type,
    });

    await newPet.save();
    res.status(201).json(newPet);
  } catch (err) {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    res.status(500).json({ error: "Error al crear mascota", detail: err });
  }
});

routerPet.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res
      .status(500)
      .json({ error: "No se encontro ninguna mascota", detail: error });
  }
});

routerPet.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id);

    if (!pet) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }

    res.json(pet);
  } catch (error) {
    res
      .status(500)
      .json({ error: "No se encontro ninguna mascota", detail: error });
  }
});

routerPet.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, gender, weight, size, type } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedData = {
      name,
      age,
      gender,
      weight,
      size,
      type,
    };

    if (image) {
      updatedData.image = image;
    }

    const updatedPet = await Pet.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedPet) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }

    res.json(updatedPet);
  } catch (error) {
    res.status(500).json({ error: "Error", detail: error });
  }
});

routerPet.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPet = await Pet.findByIdAndDelete(id);

    if (!deletedPet) {
      return res.status(404).json({ error: "No se encontro la mascota" });
    }

    if (deletedPet.image) {
      const imagePath = path.join("uploads", path.basename(deletedPet.image));
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error al borrar la imagen:", err.message);
        } else {
          console.log("Imagen eliminada:", imagePath);
        }
      });
    }

    res.json({ message: "Mascota eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar mascota", detail: error });
  }
});

export default routerPet;
