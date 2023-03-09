import {
  Button,
  CircularProgress,
  Divider,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { commentPost, getPost, getPostsBySearch } from "../../actions/posts";
import classes from "./styles.module.css";
const PostDetails = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [commentArea, setcommentArea] = useState("");
  const { id } = useParams();
  const commentsRef = useRef();
  const isMobile = useMediaQuery("(max-width:900px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, isLoading, posts } = useSelector((state) => state.postReducer);
  console.log(post);
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);
  useEffect(() => {
    dispatch(getPostsBySearch({ search: "none", tags: post?.tags.join(",") }));
  }, [post]);
  const recommandedPosts = posts.filter((post) => post._id !== id);
  const openPost = (_id) => {
    navigate(`/posts/${_id}`);
  };
  const handleChangeCommentArea = (event) => {
    setcommentArea(event.target.value);
  };
  console.log(post);
  const sendComment = () => {
    dispatch(
      commentPost(
        {
          userId: user.result._id,
          userName: user.result.name,
          details: commentArea,
          commentedAt: new Date(),
        },
        post._id
      )
    );
    setcommentArea("");
  };
  if (!post) return null;
  if (isLoading)
    return (
      <Paper
        elevation={6}
        sx={{
          textAlign: "center",
          height: "50%",
          p: "20px",
          borderRadius: "15px",
          mt: "20px",
        }}
      >
        {" "}
        <CircularProgress sx={{ justifyContent: "center" }} size="7em" />
      </Paper>
    );

  return (
    <Paper elevation={6} sx={{ p: "20px", borderRadius: "15px", mt: "20px" }}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post?.title}
          </Typography>
          <Typography
            style={{ wordBreak: "break-all" }}
            variant="h6"
            color="GrayText"
          >
            {post?.tags.map((tag) => (
              <span>#{tag}</span>
            ))}
          </Typography>
          <Typography gutterBottom variant="body1">
            {post?.message}
          </Typography>
          <Typography gutterBottom variant="h6">
            Created by:{post?.name}
          </Typography>
          <Typography gutterBottom variant="body1">
            {moment(post?.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography gutterBottom variant="body1" fontWeight="bolder">
            Comments:
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "10px",
              paddingBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                height: "200px",
              }}
              ref={commentsRef}
            >
              {post.comments.map(
                ({ userId, details, userName, _id, commentedAt }) => (
                  // <div
                  //   key={_id}
                  //   className={classes.commentSection}
                  //   style={{ flexDirection: "column" }}
                  // >
                  <div
                    className={classes.commnet}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bolder">
                      {userName}:
                    </Typography>
                    <Typography variant="subtitle2">{details}</Typography>
                    <span
                      style={{
                        alignSelf: "flex-end",
                        fontSize: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      {moment(commentedAt).fromNow()}
                    </span>
                  </div>
                  // </div>
                )
              )}
            </div>
            {user?.result?._id && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <TextField
                  multiline
                  value={commentArea}
                  onChange={handleChangeCommentArea}
                  fullWidth
                  // style={{ maxwidth: "350px", height: "100px" }}
                />

                <Button variant="contained" onClick={sendComment} fullWidth>
                  Comment
                </Button>
              </div>
            )}
          </div>
          <Divider />
        </div>
        <div className={classes.imageSection}>
          <img src={post?.selectedFile} className={classes.image} />
        </div>
      </div>

      {recommandedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommandedPosts}>
            {recommandedPosts.map(
              ({ name, title, message, likes, selectedFile, _id }) => (
                <>
                  <div
                    style={{
                      marginTop: "20px",
                      cursor: "pointer",
                      width: "200px",
                    }}
                    onClick={() => openPost(_id)}
                  >
                    <img src={selectedFile} height="100px" width="200px" />

                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="subtitle1">{name}</Typography>
                    <Typography
                      variant="subtitle2"
                      style={{ wordBreak: "break-all" }}
                    >
                      {message}
                    </Typography>
                    <Typography variant="subtitle1">
                      Likes:
                      {likes.length}
                    </Typography>
                  </div>
                  <Divider />
                </>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
