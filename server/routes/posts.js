import express from "express";
import {
  getposts,
  createpost,
  updatepost,
  deletepost,
  likepost,
  getPostsBySearch,
  getPost,
  commentPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";
const router = express.Router();
router.get("/", getposts);
router.post("/", auth, createpost);
router.patch("/:id", auth, updatepost);
router.delete("/:id", auth, deletepost);
router.patch("/:id/likepost", auth, likepost);
router.get("/search", getPostsBySearch);
router.get("/:id", getPost);
router.post("/:id/comment", auth, commentPost);
export default router;
