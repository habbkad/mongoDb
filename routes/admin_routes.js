const express = require("express");
const {
  createBlog,
  getBlogs,
  getBlog,
  upDateBlog,
  deleteBlog,
} = require("../controllers/blog_controller");
const router = express.Router();

router.route("/").post(createBlog).get(getBlogs);
router.route("/:id").get(getBlog).put(upDateBlog).delete(deleteBlog);

module.exports = router;
