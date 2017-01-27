// import the necessary modules
var mongoose = require('mongoose');
var shorturlSchema = new mongoose.Schema({

  old : String,
  new : {type: String,  unique : true }
});
module.exports = mongoose.model("Shorturl", shorturlSchema);       //Questionbank is Model name .
