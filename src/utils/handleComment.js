import { openSnackBar, closeSnackBar } from "../redux/userActionsSlice";

import { axios } from "../config/axiosConfig";

export const handleAddComment = async (
	comment,
	postId,
    dispatch,
    setCommentNo,
	setCommentData
) => {
	dispatch(openSnackBar({ message: "Posting comment", loading: true }));
    let response;
     axios.post(`/post/${postId}/addcomment`, { comment })
    .then((res) => {
        setCommentNo += 1;
        dispatch(closeSnackBar());
        response = res;
    })
    .then(() => {
        dispatch(
            openSnackBar({ message: "comment posted!!", duration: 3000 })
        )
    })
    .catch( err => {
        dispatch(closeSnackBar());
       setTimeout(()=> {
        dispatch(openSnackBar({ message: "could not post comment", type: "error", duration: 3000 }));
       }, 1000)
    })
	if (setCommentData) setCommentData(response.data);
	
	
};

export const handleEditComment = (comment, commentId, setCommentData) => {
	axios.post(`/post/${commentId}/editcomment`, { comment });
};
