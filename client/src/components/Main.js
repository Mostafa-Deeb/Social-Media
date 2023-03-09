import { Button, Paper, TextField, useMediaQuery } from "@mui/material";
import { Chip } from "@mui/material";
import { AppBar } from "@mui/material";
import { Grid, Grow } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Posts from "../Posts/Posts";
import Auth from "./Auth";
import Form from "./Form/Form";
import Paginate from "./Pagination";
import { MuiChipsInput } from "mui-chips-input";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../actions/posts";
import { useLocation, useNavigate } from "react-router-dom";
import { min } from "moment";

const Main = () => {
  const [currentId, setcurrentId] = useState(0);
  const [token, settoken] = useState(null);
  const [search, setsearch] = useState("");
  const [chips, setchips] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = query.get("page");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("profile"))
      settoken(JSON.parse(localStorage.getItem("profile")));
    else settoken(null);
  }, []);
  const handleAddChip = (newChip) => {
    setchips([...chips, newChip]);
  };
  const handleDeleteChip = (chip, chipIndex) => {
    console.log({ chip, chipIndex });
    const newChips = [...chips];
    newChips.splice(chipIndex, 1);
    console.log(newChips);
    setchips(newChips);
  };
  const handleEditChip = (chipValue, chipIndex) => {
    console.log(chipIndex, chipValue);
    const updatedChips = [...chips];
    updatedChips[chipIndex] = chipValue;
    setchips(updatedChips);
  };
  const handleInputChange = (inputValue) => {
    console.log(inputValue);
  };
  const handleSearchChange = (event) => {
    setsearch(event.target.value);
  };
  const isMobile = useMediaQuery("(max-width:900px)");
  const searchedPost = () => {
    if (search.trim() || chips.length) {
      dispatch(getPostsBySearch({ search, tags: chips.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${chips.join(",")}`
      );
    } else {
      navigate("/");
    }
  };
  return (
    <Grow in>
      <Container maxWidth="xl" sx={{ mt: "2rem" }}>
        <Grid
          container
          sx={{
            justifyContent: "space-between",
            alignItems: "stretch",
            flexDirection: isMobile ? "column-reverse" : "",
          }}
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setcurrentId={setcurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              position="static"
              color="inherit"
              sx={{
                mb: "10px",
                borderRadius: "0.5rem",
                p: "5px",
                gap: "5px",
                padding: "10px 15px",
              }}
            >
              <TextField
                sx={{ mb: "10px" }}
                fullWidth
                variant="outlined"
                name="search"
                label="Search Memories"
                onChange={handleSearchChange}
                value={search}
              />
              <MuiChipsInput
                value={chips}
                onAddChip={handleAddChip}
                onDeleteChip={handleDeleteChip}
                onEditChip={handleEditChip}
                onInputChange={handleInputChange}
                clearInputOnBlur
                disableDeleteOnBackspace
              />
              <Button variant="contained" fullWidth onClick={searchedPost}>
                {" "}
                Search
              </Button>
            </AppBar>

            <Form
              currentId={currentId}
              setcurrentId={setcurrentId}
              user={token}
            />
            {!search && !chips.length && (
              <Paper elevation={6} sx={{ mt: "10px" }}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Main;
