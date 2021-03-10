import { axios } from "../config/axiosConfig";
import {
  unlikePost,
  likePost,
  updateLikedPosts,
  updateUnlikedPosts,
} from "../redux/userDataSlice";

export const handleLike = (postId, dispatch, setLikes, scream) => {
  const likeAudio = document.getElementById("like-audio");
  likeAudio.volume = 0.6;
  likeAudio.play();
  dispatch(likePost(postId));
  setLikes((prev) => prev + 1);
  axios
    .get(`/post/like/${postId}`)
    .then(() => {
      dispatch(updateLikedPosts(scream));
    })
    .catch((err) => {});
};

export const handleUnlike = (postId, dispatch, setLikes) => {
  const likeAudio = document.getElementById("like-audio");
  likeAudio.volume = 0.6;
  likeAudio.play();
  dispatch(unlikePost(postId));
  setLikes((prev) => prev - 1);
  axios
    .get(`/post/unLike/${postId}`)
    .then(() => {
      dispatch(updateUnlikedPosts(postId));
    })
    .catch((err) => {});
};
