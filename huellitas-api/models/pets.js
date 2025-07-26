import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  image: { type: String, required: true }, //  multer
  gender: { type: String, enum: ["Macho", "Hembra"], required: true },
  weight: { type: Number, required: true },
  size: { type: String, enum: ["Small", "Medium", "Large"], required: true },
  type: { type: String, enum: ["Dog", "Cat"], required: true },
});

const Pet = mongoose.model("Pet", petSchema);
export default Pet;
