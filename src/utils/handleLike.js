import { axios } from "../config/axiosConfig";
import { unlikePost, likePost } from "../redux/userDataSlice";

export const handleLike = (postId, dispatch, setLikes) => {
	const likeAudio = document.getElementById("like-audio");
	likeAudio.play();
	dispatch(likePost(postId));
	setLikes(prev => prev + 1);
	axios
		.get(`/post/like/${postId}`)
		.then(() => {})
		.catch(err => {
			console.log(err);
		});
};

export const handleUnlike = (postId, dispatch, setLikes) => {
	const likeAudio = document.getElementById("like-audio");
	likeAudio.play();
	dispatch(unlikePost(postId));
	setLikes(prev => prev - 1);
	axios
		.get(`/post/unLike/${postId}`)
		.then(() => {})
		.catch(err => {
			console.log(err);
		});
};
