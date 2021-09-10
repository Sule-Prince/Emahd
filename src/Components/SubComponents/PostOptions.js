import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  Portal,
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVertRounded";
import { axios } from "../../config/axiosConfig";
import { screamsDataThunk } from "../../redux/postsSlice";
import MessagePage from "./MessagePage";
import { closeSnackBar, openSnackBar } from "../../redux/userActionsSlice";
import { addFriend, removeFriend } from "../../redux/userDataSlice";
import useStyles from "../styles";
import ConsentModal from "./ConsentModal";

const PostOptions = ({ user = false, postId, section, handle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
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

    dispatch(
      openSnackBar({
        message: "Link copied successfully!",
        duration: 3000,
      })
    );
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
    setDelModal(true);

    handleClose();
  };

  const sendDeleteReq = async () => {
    try {
      dispatch(
        openSnackBar({
          message: "Deleting post...",
          shouldClose: false,
          loading: true,
        })
      );
      setDelModal(false);

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
    } catch (error) {
      dispatch(closeSnackBar());
      dispatch(
        openSnackBar({
          type: "error",
          message: "Something went wrong!",
          duration: 3000,
        })
      );
    }
  };

  const classes = useStyles();

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
            <MenuList className={classes.menuList}>
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
                <div style={{ padding: 0 }} className={classes.menuList}>
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
            mainText="Have an issue with this post? Let us know and we'll review it"
            commentSection="Type your issue here."
            setDisplay={setOpenReport}
            sendData={sendReport}
          />
        </Portal>
      )}

      {openModal && (
        <ConsentModal
          hide={!delModal}
          headerText="Delete Post?"
          consentText=" Are you sure you want to delete post?"
          consentBtns={[
            {
              text: "Confirm",
              color: "primary",
              onClick: () => {
                sendDeleteReq().then(() => setOpenModal(false));
              },
            },
            {
              text: "Cancel",
              onClick: () => setOpenModal(false),
            },
          ]}
        />
      )}
    </>
  );
};

export default PostOptions;
