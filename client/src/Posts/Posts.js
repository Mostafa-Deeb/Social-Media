import { CircularProgress, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { getPosts } from "../actions/posts";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Post from "./Post/Post";
const Posts = ({ setcurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.postReducer);
  if (!posts.length && isLoading) {
    return "NO Posts";
  }
  console.log(posts);
  return isLoading ? (
    <CircularProgress sx={{ justifyContent: "center" }} />
  ) : (
    <Grid container alignItems="stretch" spacing={5}>
      {posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setcurrentId={setcurrentId} currentId />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
