import { Box, IconButton, Modal, Typography } from "@mui/material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import "./../styles/Nav.css";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CreateTodo from "./CreateTodo";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Nav = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="navContainer">
      <div className="nav">
        <Typography
          sx={{ position: "absolute", left: "10px", bottom: "12px" }}
          variant="h6"
        >
          Hello, {props.userName}!
        </Typography>
        <IconButton onClick={handleOpen}>
          <PostAddIcon
            // onClick={handleOpen}
            sx={{ color: "green", fontSize:'30px' }}
          ></PostAddIcon>
        </IconButton>

        <IconButton onClick={props.signOut}>
          <LogoutIcon style={{ color: "red" }}  />
        </IconButton>
        <Modal open={open}>
          <Box sx={style}>
            <CreateTodo
              open={open}
              onClose={handleClose}
              fetchUserTodo={props.fetchUserTodo}
              userId={props.userId}
              userName={props.userName}
              handleCreateTaskButton={props.handleCreateTaskButton}
              handleClose={handleClose}
            />
          </Box>
        </Modal>
        {/* <Button style={{backgroundColor: 'red' }} variant='contained' onClick={props.signOut}>Sign Out</Button> */}
      </div>
    </div>
  );
};

export default Nav;
