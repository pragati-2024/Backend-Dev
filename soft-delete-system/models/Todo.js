const mongoose = require("mongoose");
const { softDeletePlugin } = require("../plugins/softDelete");

const todoSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
  },
  { timestamps: true },
);

todoSchema.plugin(softDeletePlugin);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = { Todo };
