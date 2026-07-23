import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.ObjectId,
    ref: "student",
    required: true
  },

  courseId: {
    type: mongoose.Schema.ObjectId,
    ref: "course",
    required: true
  },

  grade: {
    type: String,
    required: true
  },

  semester: {
    type: String,
    required: true
  }
});

const Grade = mongoose.model("grade", gradeSchema);
export default Grade;

// Grade.find()
//   .populate("studentId")
//   .populate("courseId")