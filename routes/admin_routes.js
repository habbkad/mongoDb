const express = require("express");
const {
  createBlog,
  getBlogs,
  getBlog,
  upDateBlog,
  deleteBlog,
} = require("../controllers/blog_controller");
const { verify, authorize } = require("../utils/authorization_verification");
const router = express.Router();

router
  .route("/")
  .post(verify, authorize("Admin"), createBlog)
  .get(verify, getBlogs);
router
  .route("/:id")
  .get(verify, getBlog)
  .put(verify, authorize("Admin"), upDateBlog)
  .delete(verify, authorize("Admin"), deleteBlog);

module.exports = router;
