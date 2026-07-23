import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    maxlength: [25, 'Name must contain 25 character']
  },
  courseCode: {
    type: Number,
    required: true,
    unique: true
  },
  credit: {
    type: Number,
    required: true,
    min: [1, "credit atleast one"]
  },
  prerequisites: [{
    type: mongoose.Schema.ObjectId,
    ref: "course"
  }]
})

const Course = mongoose.model("course", courseSchema)
export default Course