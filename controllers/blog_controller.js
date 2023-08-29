const mongoose = require("mongoose");
const blog = require("../models/blog_model");

const createBlog = async (req, res) => {
  const data = req.body;

  try {
    const newBlog = new blog(data);
    await newBlog.save();
    res.status(200).json({
      message: "successfull",
      newBlog,
    });
  } catch (err) {
    console.log(err);
    res.status(201).json({
      message: "unsuccessfull",
    });
  }
};

const getBlogs = async (req, res) => {
  try {
    const allBlogs = await blog.find();
    res.status(200).json({
      message: "successfull",
      allBlogs,
    });
  } catch (err) {
    console.log(err);
    res.status(201).json({
      message: "unsuccessfull",
    });
  }
};

const getBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const oneBlog = await blog.findById(id);

    res.status(200).json({
      message: "successfull",
      oneBlog,
    });
  } catch (err) {
    console.log(err);
    res.status(201).json({
      message: "unsuccessfull",
    });
  }
};
const upDateBlog = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const updatedBlog = await blog.findByIdAndUpdate(id, { description });

    res.status(200).json({
      message: "successfull",
      updatedBlog,
    });
  } catch (err) {
    console.log(err);
    res.status(201).json({
      message: "unsuccessfull",
    });
  }
};
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await blog.findByIdAndDelete(id);

    res.status(200).json({
      message: "successfull",
      deletedBlog,
    });
  } catch (err) {
    console.log(err);
    res.status(201).json({
      message: "unsuccessfull",
    });
  }
};

module.exports = { createBlog, getBlogs, getBlog, upDateBlog, deleteBlog };
