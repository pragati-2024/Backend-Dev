import mongoose from "mongoose";

const professorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: [30, "Name must be less than 30 characters"]
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  departments: [
    {
      type: String,
      required: true
    }
  ],

  experience: {
    type: Number,
    required: true,
    min: [0, "Experience cannot be negative"]
  }
});

const Professor = mongoose.model("professor", professorSchema);
export default Professor;