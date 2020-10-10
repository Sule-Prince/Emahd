import React, { useState } from "react";
import { Paper, Button, Grid, Typography } from "@material-ui/core";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";
import Page6 from "./Page6";
import Page7 from "./Page7";

export default ({ history, ...props }) => {
	const [page, setPage] = useState(0);

	// Function to take user to the next page
	function next(ev) {
		let value = ev.target.getAttribute("page");
		setPage(parseInt(value));
	}

	// Set form values to send to the server
	const [handle, setHandle] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [gender, setGender] = useState("custom");
	const [university, setUniversity] = useState("");
	const [course, setCourse] = useState("");
	const [email, setEmail] = useState("");
	const [DOB, setDOB] = useState("");
	const userDetails = {
		handle,
		password,
		firstName,
		lastName,
		gender,
		university,
		course,
		email,
		DOB,
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
					firstName={firstName}
					lastName={lastName}
					next={next}
				/>
			)}
			{page === 2 && (
				<Page3
					setHandle={setHandle}
					setUniversity={setUniversity}
					setCourse={setCourse}
					course={course}
					university={university}
					handle={handle}
					next={next}
				/>
			)}
			{page === 3 && (
				<Page4 setEmail={setEmail} email={email} handle={handle} next={next} />
			)}
			{page === 4 && (
				<Page5 setPassword={setPassword} password={password} next={next} />
			)}
			{page === 5 && (
				<Page6
					setGender={setGender}
					setDOB={setDOB}
					DOB={DOB}
					gender={gender}
					next={next}
				/>
			)}
			{page === 6 && (
				<Page7 userDetails={userDetails} history={history} next={next} />
			)}
		</div>
	);
};
