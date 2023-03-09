import {
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import moment from "moment";
import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import classes from "./styles.module.css";
import { red, lightBlue } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deletePost, getPostsBySearch, likePost } from "../../actions/posts";
import { Link, useNavigate } from "react-router-dom";
const Post = ({ post, setcurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(post);
  const [liked, setliked] = useState(
    post?.likes?.findIndex((like) => like === user?.result?._id) === -1
      ? false
      : true
  );
  console.log(user?.result?._id);
  console.log(post?.creator);
  // console.log(post.likes.length);
  // console.log("likes");
  const handleUpdate = (e) => {
    setcurrentId(post._id);
    // console.log(post._id);
  };
  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };
  const handleLike = (event) => {
    setliked((prevState) => !prevState);
    dispatch(likePost(post._id));
  };
  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };
  // console.log(post);
  const Favorite = () => {
    return liked ? (
      <>
        <FavoriteIcon sx={{ color: red[500] }} />
        &nbsp;
        {post?.likes?.length > 2 ? (
          <span style={{ fontSize: "small" }}>
            Liked by You and {post.likes.length - 1} others
          </span>
        ) : (
          <span>
            {post?.likes?.length} like{post?.likes?.length > 1 ? "s" : ""}
          </span>
        )}
      </>
    ) : (
      <>
        <FavoriteIcon />
        &nbsp;{post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
      </>
    );
  };

  return (
    <Card
      className={classes.card}
      raised
      elevation={6}
      sx={{ borderRadius: "20px" }}
    >
      {/* <ButtonBase onClick={openPost} className={classes.cardAction}> */}
      <CardMedia
        className={classes.media}
        image={post?.selectedFile}
        component={Link}
        to={`/posts/${post._id}`}
        // sx={{ height: "100px" }}
      />
      <div className={classes.overlay1}>
        <Typography variant="h6">{post?.name}</Typography>
        <Typography variant="subtitle2">
          {moment(post?.createdAt).fromNow()}
        </Typography>
      </div>
      {post?.creator === user?.result?._id && (
        <div className={classes.overlay2}>
          <CardActions>
            <IconButton onClick={handleUpdate}>
              <span style={{ color: "white" }}>
                <MoreHorizIcon />
              </span>{" "}
            </IconButton>
          </CardActions>
        </div>
      )}
      <CardContent style={{ height: "100%" }}>
        <Typography variiant="body2">
          {post?.tags?.map((tag, index) => (
            <span
              className={classes.tag}
              key={index}
              onClick={() => {
                dispatch(getPostsBySearch({ search: "none", tags: tag }));
                navigate(`/posts/search?tags=${tag}`);
              }}
              style={{ cursor: "pointer", color: "blueviolet" }}
            >
              #{tag}{" "}
            </span>
          ))}
        </Typography>

        <Typography
          className={classes.title}
          color="textSecondary"
          variant="h6"
          gutterBottom
        >
          {post?.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {post?.message}
        </Typography>
      </CardContent>
      {/* </ButtonBase> */}
      <CardActions className={classes.actions}>
        <div>
          <IconButton onClick={handleLike} disabled={!user?.result}>
            <Favorite />
          </IconButton>
        </div>

        {post.creator === user?.result?._id && (
          <IconButton onClick={handleDelete}>
            <DeleteOutlined />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
