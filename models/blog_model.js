const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//creating a schema
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  comments: {
    type: [{ name: String, comment: String }],
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  picture: {
    type: String,
  },
});

//creating a model (collection name)
const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
