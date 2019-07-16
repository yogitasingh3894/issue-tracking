const mongoose = require("mongoose");


//Comment Schema
var commentSchema = mongoose.Schema({
  text: String,
  author: { type: String, default: "a@g.com" }
});

var Image = mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  originalname: {
    type: String,
    required: true
  }
}, {timestamps: true})

//Post Schema
const postSchema = mongoose.Schema({
  postTitle: String,
  postDescription: String,
  date:String,
  status:String,
  createdBy: { type: String, default: "a@g.com" },
  comments: [commentSchema],
  images:[Image],
  assign_to:[{type:String}],
  likes: [
    {
      type: String
    }
  ]
});

const postModel = mongoose.model("post", postSchema);

module.exports = {
  post: postModel
};
