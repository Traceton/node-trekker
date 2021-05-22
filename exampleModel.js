const mongoose = require("mongoose");

const dropBoxAnswerSchema = new mongoose.Schema({
  dropBoxId: {
    type: String,
    required: true,
  },
  dropBoxAnswer: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("dropBoxAnswer", dropBoxAnswerSchema);

// g m user dropBoxId:String dropBoxAnswer:String
