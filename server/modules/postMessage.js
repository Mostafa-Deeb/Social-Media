import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: {
    type: [
      { userId: String, userName: String, details: String, commentedAt: Date },
    ],
    default: [],
  },
});
const PostMessage = mongoose.model("PostMessage", postSchema);
export default PostMessage;
