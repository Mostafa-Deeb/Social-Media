import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import camera from "../camera.png";
import React, { useEffect, useState } from "react";
import classes from "../styles.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import connect from "../connect.png";
import decode from "jwt-decode";
const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("profile")));
  const handleLogOut = () => {
    localStorage.removeItem("profile");
    navigate("/");
    setuser(null);
  };
  const isMobile = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      // console.log(decodedToken);
      const date = new Date();
      if (decodedToken.exp * 1000 < date.getTime()) handleLogOut();
    }
    setuser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar
      position="static"
      elevation={6}
      color="inherit"
      sx={{
        display: "flex",
        p: "0px 20px ",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: "10px",
      }}
    >
      <div className={classes.brandContainer}>
        <Link to="/">
          <img
            src={connect}
            className={classes.image}
            height="40px"
            width="100px"
          />
        </Link>
        <img
          className={classes.image}
          src={camera}
          alt="logo"
          height="70px"
          width="30px"
        />
      </div>
      {pathname !== "/auth" && (
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div
              className={classes.info}
              style={{ gap: isMobile ? "5px" : "" }}
            >
              <Avatar>{user?.result?.name?.charAt(0)}</Avatar>
              {!isMobile && (
                <Typography variant="subtitle2">
                  {user?.result?.name}
                </Typography>
              )}
              <Button variant="contained" color="error" onClick={handleLogOut}>
                Log Out
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
              sx={{ width: "30px", textAlign: "center" }}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Navbar;
