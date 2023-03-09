import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../../actions/posts.js";
import classes from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import Input from "../Input.js";
import { render } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";

const Form = ({ currentId, setcurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const location = useLocation();
  const [token, settoken] = useState(user);
  const postToBeUpdated = useSelector((state) =>
    currentId
      ? state.postReducer.posts.find((post) => post._id === currentId)
      : null
  );
  const [postData, setpostData] = useState({
    title: "",
    message: "",
    tags: [],
    selecetedFile: "",
  });

  useEffect(() => {
    if (currentId) {
      setpostData(postToBeUpdated);
    }
  }, [currentId]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      setcurrentId(0);
      clear();
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      clear();
    }
  };
  const clear = () => {
    setcurrentId(0);
    setpostData({
      creator: "",
      title: "",
      message: "",
      tags: [],
      selecetedFile: "",
    });
  };
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography
          variant="h6"
          align="center"
          fontFamily={"serif"}
          fontWeight="bold"
          fontSize="medium"
        >
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper sx={{ p: "20px" }} elevation={6} className={classes.paper}>
      <form
        className={`${classes.form} ${classes.root}`}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" gutterBottom align="center">
          {!currentId ? "Creating a Memory" : "Editing a Memory"}
        </Typography>
        <Grid container gap={2}>
          {/* <TextField
            type="text"
            label="Creator"
            name="creator"
            fullWidth
            value={postData.creator}
            onChange={(e) =>
              setpostData({ ...postData, creator: e.target.value })
            }
          /> */}
          <TextField
            type="text"
            label="Title"
            name="title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setpostData({ ...postData, title: e.target.value })
            }
          />{" "}
          <TextField
            type="text"
            label="Message"
            name="message"
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setpostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            type="text"
            label="Tags"
            name="tags"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setpostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              mutltiple={false}
              onDone={({ base64 }) =>
                setpostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
        </Grid>

        <Button
          sx={{ marginBottom: "10px", mt: "10px" }}
          className={classes.buttonSubmit}
          fullWidth
          color="primary"
          size="large"
          variant="contained"
          onClick={handleSubmit}
        >
          {!currentId ? "SUBMIT" : "Edit"}
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
        >
          CLEAR
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
