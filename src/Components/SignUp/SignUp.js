import React, { useState } from "react";
import { Paper, Button, Grid, Typography } from "@material-ui/core";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";
import Page6 from "./Page6";
import Page7 from "./Page7";

export default ({history, ...props}) => {
	const [page, setPage] = useState(0);

	// Function to take user to the next page
	function next(ev) {
		let value = ev.target.getAttribute("page");
		setPage(parseInt(value));
	}

	// Set form values to send to the server
	const [handle, setHandle] = useState(null);
	const [password, setPassword] = useState(null);
	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const [gender, setGender] = useState(null);
	const [phoneNumber, setPhoneNumber] = useState(null);
	const [university, setUniversity] = useState(null);
	const [course, setCourse] = useState(null);
	const [email, setEmail] = useState(null);
	const [DOB, setDOB] = useState(null);
	const userDetails = {
		handle,
		password,
		firstName,
		lastName,
		gender,
		phoneNumber,
		university,
		course,
		email,
		"D.O.B": DOB,
	};
	return (
		<div>
			<Paper>
				<Grid style={{ padding: "5px 0" }} container justify="center">
					<Typography
						style={{ fontWeight: "bold", color: "#444" }}
						variant="subtitle1"
					>
						EMahd
					</Typography>
				</Grid>
			</Paper>

			<Button
				disabled={page === 0 ? true : false}
				onClick={() => {
					setPage(page - 1);
				}}
			>
				Back
			</Button>
			{page === 0 && <Page1 next={next} />}
			{page === 1 && (
				<Page2
					setLastName={setLastName}
					setFirstName={setFirstName}
					next={next}
				/>
			)}
			{page === 2 && (
				<Page3
					setHandle={setHandle}
					setUniversity={setUniversity}
					setCourse={setCourse}
					next={next}
				/>
			)}
			{page === 3 && (
				<Page4
					setEmail={setEmail}
					setPhoneNumber={setPhoneNumber}
					next={next}
				/>
			)}
			{page === 4 && <Page5 setPassword={setPassword} next={next} />}
			{page === 5 && (
				<Page6 setGender={setGender} setDOB={setDOB} next={next} />
			)}
			{page === 6 && (
				<Page7 userDetails={userDetails} history={history} next={next} />
			)}
		</div>
	);
};
