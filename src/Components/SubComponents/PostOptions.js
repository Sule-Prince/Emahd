import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

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
import { addFriend, removeFriend } from "../../redux/userDataSlice";

const PostOptions = ({ user = false, postId, section, handle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openReport, setOpenReport] = useState(false);

  const [followVal, setFollowVal] = useState("Follow");

  const friends = useSelector((state) => state.user.data.friends);
  const admin = useSelector((state) => state.user.data.admin);
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

  const addToPost = () => {
    dispatch(
      openSnackBar({
        loading: true,
        message: ` adding post to top stories`,
      })
    );
    axios
      .post(`/admin/addpost/${postId}`, { section })
      .then(() => {
        dispatch(closeSnackBar());
        dispatch(
          openSnackBar({
            message: `${postId} added to top stories successfully!`,
            duration: 3000,
          })
        );
      })
      .catch(() => {
        dispatch(closeSnackBar());
        dispatch(
          openSnackBar({
            type: "error",
            message: `Post couldn't be added to top posts`,
            duration: 3000,
          })
        );
      });
  };

  const handleFollowReq = (friend) => {
    if (followVal.toLowerCase() === "follow") {
      axios.post("/user/followrequest", { friend }).then(() => {
        setFollowVal("Unfollow");
        dispatch(addFriend(friend));
        dispatch(screamsDataThunk());
        dispatch(
          openSnackBar({
            message: `${handle} followed successfully`,
            duration: 3000,
          })
        );
      });
    } else {
      axios.post("/user/unfollowrequest", { friend }).then(() => {
        setFollowVal("Follow");
        dispatch(removeFriend(friend));
        dispatch(screamsDataThunk());
        dispatch(
          openSnackBar({
            message: `${handle} unfollowed successfully`,
            duration: 3000,
          })
        );
      });
    }

    handleClose();
  };

  useEffect(() => {
    if (!friends) return;
    if (friends.includes(handle)) setFollowVal("Unfollow");
    else setFollowVal("Follow");
  }, [friends, handle]);

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

  const sendDeleteReq = async () => {
    dispatch(
      openSnackBar({
        message: "Deleting post...",
        shouldClose: false,
        loading: true,
      })
    );
    await axios.post(`/deletescream/${handle}`, { postId });
    dispatch(screamsDataThunk());
    dispatch(closeSnackBar());
    dispatch(
      openSnackBar({
        type: "success",
        message: "Post deleted successfully",
        duration: 3000,
      })
    );
  };

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
            <MenuList>
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
              {user ? (
                <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
              ) : (
                <div>
                  <MenuItem
                    onClick={() => {
                      handleFollowReq(handle);
                    }}>
                    {followVal}
                  </MenuItem>

                  <MenuItem onClick={openReportHandle}>Report Post</MenuItem>
                </div>
              )}
              {admin && (
                <MenuItem onClick={addToPost}>Add To Top Posts</MenuItem>
              )}
            </MenuList>
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
                    sendDeleteReq().then(() => setOpenModal(false));
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
