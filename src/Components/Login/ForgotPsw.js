import React, { useState, useEffect } from "react";

import {
	TextField,
	Grid,
	Typography,
	Input,
	Fade,
	Button,
	Modal,
	Paper,
	Backdrop,
	makeStyles,
	InputAdornment,
	IconButton,
	CircularProgress
} from "@material-ui/core";

import EventIcon from "@material-ui/icons/Event";
import { axios } from "../../config/axiosConfig";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
	modal: {
		display: "flex",
		width: "80%",
		marginLeft: "10%",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		padding: theme.spacing(5, 3),
	},
}));

export default () => {
	const [feedback, setFeedback] = useState("");
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [email, setEmail] = useState("");
	const [DOB, setDOB] = useState("");

	const classes = useStyles();

	const handleResetRequest = async data => {
		setIsLoading(true)
		try {
			const response = await axios.post("reset", data);
			setFeedback(response.data.feedback);
			setIsLoading(false)
			setOpen(true);
		} catch (error) {
			console.log(error.message)
			setFeedback(
				"sorry we were unable to carry out your request, please try again later"
			);
			setIsLoading(false)
			setOpen(true);
			
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("token")
		if(token) localStorage.removeItem("token") 
	}, [])

	return (
		<div>
			<Grid spacing={3} container style={{ padding: "10% 7%" }}>
				<Grid item xs={12} style={{ marginTop: 12 }}>
					<Typography variant="body2" component="p">
						Please Enter the email associated with the Account you wish to
						recover
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						value={email}
						id="email"
						label="email"
						onChange={e => setEmail(e.target.value)}
					/>
				</Grid>

				<Grid item xs={12}>
					<Typography variant="body2" component="p">
						Please Enter your Date Of Birth stated as when registered or updated
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Input
						id="DOB"
						name="DOB"
						type="date"
						value={DOB}
						onChange={e => setDOB(e.target.value)}
						style={{ width: "100%" }}
						endAdornment={
							<InputAdornment style= {{ marginLeft: -50, zIndex: -1 }} position="end"> 
								<IconButton aria-label="">
									<EventIcon color="primary" />
								</IconButton>
							</InputAdornment>
						}
					/>
				</Grid>

				<Grid item xs={12}>
					<Button
						variant="contained"
						disabled= {isLoading}
						fullWidth
						style= {{ color: "#2196f3"}}
						onClick={() => {
						console.log({email, DOB})
							handleResetRequest({ email, DOB });
						}}
					>
						{
							isLoading ? <CircularProgress color="primary" thickness={5} size={25} /> : "Submit"
						}
					</Button>
				</Grid>
			</Grid>

			
				<TransitionsModal
					open={open}
					setOpen={setOpen}
					classes={classes}
					feedback={feedback}
				/>
				<Grid item xs= {12} style= {{ height: 50}}></Grid>
			<Grid style= {{ textAlign: "center", width: "100%", marginTop: 140, marginBottom: 20}} item xs= {12} >
				<Link to= "/">Back to Login</Link>
			</Grid>
		</div>
	);
};

const TransitionsModal = ({ open, classes, setOpen, feedback }) => {
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Modal
			style={{ border: "none" }}
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			className={classes.modal}
			open={open}
			onClose={handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={open}>
				<Paper style={{ outline: "none" }} className={classes.paper}>
					<Typography varaint="body1" align="center">
						{feedback}
					</Typography>
				</Paper>
			</Fade>
		</Modal>
	);
};
