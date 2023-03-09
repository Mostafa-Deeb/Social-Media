import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import classes from "./Auth.module.css";
import { red } from "@mui/material/colors";
import { signin, signup } from "../actions/Auth";
const initialState = {
  FirstName: "",
  lastName: "",
  email: "",
  password: "",
  ConfirmPassword: "",
};
const Auth = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("profile")) {
    navigate("/");
  }
  const [formData, setformData] = useState(initialState);
  const [showPassword, setshowPassword] = useState(false);
  const [isSignUp, setisSignUp] = useState(false);
  const dispatch = useDispatch();
  const handleShowPassword = () => {
    console.log(showPassword);
    setshowPassword((prevState) => !prevState);
    console.log(showPassword);
  };
  const switchMode = () => {
    setisSignUp((prevState) => !prevState);
  };
  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
    console.log(e.target.name);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("in");
    if (isSignUp) {
      console.log(formData);
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };
  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <Paper elevation={3} className={classes.paper}>
        <Avatar className={classes.avatar} sx={{ background: "red" }}>
          <LockIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="FirstName"
                  type="text"
                  half
                  autofocus
                  onChange={onChange}
                />
                <Input
                  name="lastName"
                  label="FirstName"
                  type="text"
                  half
                  onChange={onChange}
                />
              </>
            )}
            <Input name="email" label="Email" type="text" onChange={onChange} />{" "}
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              onChange={onChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="ConfirmPassword"
                type={showPassword ? "text" : "password"}
                onChange={onChange}
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>
          <Button
            sx={{ mt: "10px" }}
            className={classes.submit}
            fullWidth
            color="primary"
            size="large"
            variant="contained"
            onClick={handleSubmit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Button onClick={switchMode}>
              {isSignUp
                ? "Already have an account? Sign IN"
                : "Don't have an account Sign Up"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
