const mongoose = require("mongoose"); 


  const carSchema = new mongoose.Schema({

  dropBoxId:{type:String,required:true},dropBoxAnswer:{type:String,required:true},createdOn: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  }); 


  module.exports = mongoose.model("car", carSchema);