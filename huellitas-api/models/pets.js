import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  image: { type: String, required: true }, //  multer
  gender: { type: String, enum: ["Macho", "Hembra"], required: true },
  weight: { type: Number, required: true },
  size: {
    type: String,
    enum: ["Pequeño", "Mediano", "Grande"],
    required: true,
  },
  type: { type: String, enum: ["Perro", "Gato"], required: true },
});

const Pet = mongoose.model("Pet", petSchema);
export default Pet;
