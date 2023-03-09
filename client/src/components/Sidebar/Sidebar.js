import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import Favorite from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton, Modal, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
const Sidebar = () => {
  const [show, setshow] = useState(true);
  const Root = styled(Box)(({ theme }) => ({
    zIndex: "30",
    [theme.breakpoints.down("md")]: {
      width: show ? "70px" : "0px",
      overflow: "auto",
    },
    [theme.breakpoints.up("md")]: {
      width: "180px",
    },
  }));
  const isMobile = useMediaQuery("(max-width:900px)");
  return (
    <>
      <IconButton
        sx={{ mt: "-50px", ml: "-33px" }}
        onClick={(e) => setshow(!show)}
      >
        <MenuIcon />
      </IconButton>
      <Root className="flex">
        <div className="start">
          {isMobile && (
            <IconButton
              onClick={() => setshow(!show)}
              sx={{ display: { md: "none", lg: "none" } }}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
        </div>
        <NavLink
          to="/f"
          className="link"
          style={({ isActive }) =>
            isActive ? { background: "rgb(165, 164, 164)" } : undefined
          }
        >
          <Favorite /> {!isMobile && <span>Favorite</span>}
        </NavLink>
        <Divider />
        <NavLink
          to="/d"
          className="link"
          style={({ isActive }) =>
            isActive ? { background: "rgb(165, 164, 164)" } : undefined
          }
        >
          <DeleteOutlineIcon />
          {!isMobile && <span>Trash</span>}
        </NavLink>
        <Divider />
        <NavLink
          to="/i"
          className="link"
          style={({ isActive }) =>
            isActive ? { background: "rgb(165, 164, 164)" } : undefined
          }
        >
          <AllInboxIcon />
          {!isMobile && <span>All Posts</span>}
        </NavLink>
        <Divider />
      </Root>
    </>
  );
};

export default Sidebar;
