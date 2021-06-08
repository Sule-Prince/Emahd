import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import {
  Grid,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  Portal,
  Typography,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

import DoneIcon from "@material-ui/icons/Done";

import MoreVertIcon from "@material-ui/icons/MoreVertRounded";
import { axios } from "../../config/axiosConfig";
import { screamsDataThunk } from "../../redux/postsSlice";
import MessagePage from "./MessagePage";
import FixedModal from "./FixedModal";
import { closeSnackBar, openSnackBar } from "../../redux/userActionsSlice";

const PostOptions = ({ user = false, postId, handle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  const [openReport, setOpenReport] = useState(false);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const copyLink = () => {
    navigator.clipboard.writeText(`https://xemahd.com/post/${postId}`);

    handleClose();
  };

  const unfollowUser = () => {
    axios.post("/user/unfollowrequest", { friend: handle }).then(() => {
      dispatch(screamsDataThunk());
      dispatch(
        openSnackBar({
          message: `${handle} unfollowed successfully`,
          duration: 3000,
        })
      );
    });

    handleClose();
  };

  const openReportHandle = () => {
    setOpenReport(true);
    handleClose();
  };

  const sendData = (type) => {
    return (message) => {
      dispatch(
        openSnackBar({
          message: "Sending...",
          shouldClose: false,
          loading: true,
        })
      );
      return axios.post("/user/feedback", { type, message }).then(() => {
        dispatch(closeSnackBar());

        dispatch(
          openSnackBar({
            message: "Report sent successfully.",
            duration: 3000,
          })
        );
      });
    };
  };
  const sendReport = sendData("report");

  const handleDelete = () => {
    setOpenModal(true);
    handleClose();
  };

  useEffect(() => {
    if (!deletePost) return;

    const sendDeleteReq = () => {
      dispatch(
        openSnackBar({
          message: "Deleting post...",
          shouldClose: false,
          loading: true,
        })
      );
      axios.post("/deletescream", { postId }).then(() => {
        dispatch(screamsDataThunk());
        dispatch(closeSnackBar());
        dispatch(
          openSnackBar({
            message: "Post deleted successfully",
            duration: 3000,
          })
        );
        setDeletePost(false);
      });
    };
    sendDeleteReq();
  }, [deletePost, postId, dispatch]);

  return (
    <>
      <div>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}>
          <Paper>
            {user ? (
              <MenuList>
                <MenuItem onClick={copyLink}>Copy Link</MenuItem>
                <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(
                      openSnackBar({
                        message: "Post archived successfully",
                        duration: 3000,
                      })
                    );
                    handleClose();
                  }}>
                  Archive post
                </MenuItem>
              </MenuList>
            ) : (
              <MenuList>
                <MenuItem onClick={unfollowUser}>Unfollow</MenuItem>
                <MenuItem onClick={copyLink}>Copy Link</MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(
                      openSnackBar({
                        message: "Post archived successfully",
                        duration: 3000,
                      })
                    );
                    handleClose();
                  }}>
                  Archive post
                </MenuItem>
                <MenuItem onClick={openReportHandle}>Report Post</MenuItem>
              </MenuList>
            )}
          </Paper>
        </Popover>
      </div>
      {openReport && (
        <Portal container={document.body}>
          <MessagePage
            button="Send Report"
            header="Report a problem"
            mainText="Is there a problem? Feel free to report it here"
            commentSection="Type your issue here."
            setDisplay={setOpenReport}
            sendData={sendReport}
          />
        </Portal>
      )}

      {openModal && (
        <FixedModal>
          <>
            <Typography variant="body2" gutterBottom>
              Are you sure you want to delete post?
            </Typography>
            <Grid container style={{ padding: "4px 0px" }}>
              <Grid item style={{ flexGrow: 1 }}>
                <IconButton color="primary" onClick={() => setOpenModal(false)}>
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  color="primary"
                  onClick={() => {
                    setDeletePost(true);
                    setOpenModal(false);
                  }}>
                  <DoneIcon />
                </IconButton>
              </Grid>
            </Grid>
          </>
        </FixedModal>
      )}
    </>
  );
};

export default PostOptions;
