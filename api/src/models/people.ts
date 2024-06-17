import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
  name: String,
  cpf: String,
  email: String,
});

const peopleSchema = new mongoose.Schema({
  name: String,
  cpf: String,
  email: String,
  friends: [friendSchema],
});

export const People = mongoose.model("People", peopleSchema);
