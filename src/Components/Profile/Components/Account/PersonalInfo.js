import React, { useState } from "react";

import { Grid, Button, makeStyles } from "@material-ui/core";
import Header from "../../../SubComponents/Header";
import MyInput from "../../../SubComponents/MyInput";
import { axios } from "../../../../config/axiosConfig";
import { useDispatch } from "react-redux"; 
import { openSnackBar } from "../../../../redux/userActionsSlice";
import { userDataThunk } from "../../../../redux/userDataSlice";
const useStyles = makeStyles(theme => ({
	root: {
		height: "100vh",
		width: "100vw",
		display: "block",
		backgroundColor: theme.palette.background.paper,
		zIndex: 1210,
		overflowY: "auto",
		transition: "all .5s cubic-bezier(0, .4, .6, 1)",
		position: "absolute",
		top: 0,
	},
	dataContainer: {
		marginBottom: 8,
	},
}));

const PersonalInfo = ({ setOpenInfo }) => {
	const [gender, setGender] = useState("");
	const [DOB, setDOB] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNo, setPhoneNo] = useState("");

	const dispatch = useDispatch();

	const editablesArray = [
		{ data: "email", label: "Email Address", setData: setEmail },
		{ data: "phoneNo", label: "Phone Number", setData: setPhoneNo },
		{ data: "gender", label: "Gender", setData: setGender },
		{ data: "DOB", label: "Date Of Birth", setData: setDOB },
	];

	const updateInfo = () => {
		if (DOB || gender) {
			axios
				.post("/user/addinfo", { DOB, gender })
				.then(response => {
					dispatch(userDataThunk())
					dispatch(
						openSnackBar({
							duration: 4000,
							message: response.data.feedback,
						})
					);
				})
				.catch(error => {
					if(error.response) {
						dispatch(
							openSnackBar({
								type: "error",
								duration: 4000,
								message: error.response.feedback,
							})
						);
					} else {
						dispatch(
							openSnackBar({
								type: "error",
								duration: 4000,
								message: "We could not carry out your request because you're offline",
							})
						);
					}
				});
		}
	};

	const genderArray = ["Custom", "Male", "Female"];

	const classes = useStyles();
	return (
		<Grid container className={classes.root}>
			<Header setDisplay={setOpenInfo} data="Personal Information" />

			<Grid container>
				{editablesArray.map(data => {
					if (data.data === "gender")
						return (
							<MyInput
								data={data}
								setData={data.setData}
								key={data.data}
								label={true}
								classes={classes}
								dataArray={genderArray}
							/>
						);
					
					return <MyInput key={data.data} setData= {data.setData} classes={classes} data={data} />;
				})}
			</Grid>

			<div style={{ padding: "1rem 0px" }}>
				<Grid container justify="center" item xs={12}>
					<Button
						style={{ padding: 8, width: "94%", marginTop: 16 }}
						variant="outlined"
						color="primary"
						onClick={updateInfo}
					>
						Update Information
					</Button>
				</Grid>
			</div>
		</Grid>
	);
};

export default PersonalInfo;
