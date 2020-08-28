/* 
import { useState, useEffect } from "react";
import { axios } from "../../config/axiosConfig";
import { useDispatch } from "react-redux";
import { updateData, userDataThunk } from "../../redux/userDataSlice";
 
const useGetData = route => {
	const [error, setError] = useState("");
	const dispatch = useDispatch()
	useEffect(() => {
		axios
			.get(route)
			.then(res => {
				dispatch(updateData(res.data))
			})
			.catch(err => {
				setError(err);
			});
	}, []);

	return { error };
}; 

export default useGetData;
*/