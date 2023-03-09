import mongoose from "mongoose";
import PostMessage from "../modules/postMessage.js";

export const getposts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
export const createpost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updatepost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No post with that id");
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deletepost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No post with that id");
    }
    await PostMessage.findByIdAndDelete(id);
    res.status(201).json({ id: id });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const likepost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ message: "User unauthenticated" });
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id");
    const post = await PostMessage.findById(id);
    const hasLiked = post.likes.findIndex((id) => id === req.userId);
    if (hasLiked === -1) {
      console.log("notliked");
      post.likes.push(req.userId);
    } else {
      console.log("liked");
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(201).json(updatedPost);
  } catch (error) {
    console.log("error");
    res.status(404).json({ message: error.message });
  }
};
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.json({ data: posts });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const getPost = async (req, res) => {
  console.log("in");
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "No posts with that Id" });
    }

    const post = await PostMessage.findById(id);
    console.log(post);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: message.error });
  }
};
export const commentPost = async (req, res) => {
  const { id } = req.params;
  console.log("inn");
  console.log(req.body);
  try {
    if (!req.userId)
      return res.status(404).json({ message: "User is Unauthenticated" });
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(402).json({ message: "No post with that Id" });
    const post = await PostMessage.findById(id);
    console.log(post);

    post.comments.push(req.body);
    console.log(post.comments);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    console.log(updatedPost);
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
