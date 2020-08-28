import React from "react";
import { makeStyles, TextField, Grid, Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { courses } from "../assets/courses";
import { universities } from "../assets/schools";

const useStyles = makeStyles(theme => ({
	textField: {
		margin: theme.spacing(1.3),
		"& > * ": {
			width: `100%`,
		},
	},
	button: {
		backgroundColor: theme.palette.primary["main"],
		width: " 100% ",
		fontFamily: "Roboto, Helvetica, Arial, sans-serif",
		color: "#fff",
	},
	selectForm: {
		minWidth: "100%",
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
		},
	},
}));

const getData = name => {
	const form = document.getElementsByTagName("form")[0];
	console.log(form[name].value);
	return form[name].value;
};

export default ({ setHandle, setCourse, setUniversity, ...props }) => {
	const classes = useStyles();
	return (
		<form>
			<Grid container>
				<Grid container justify="center" item xs={12}>
					<Grid
						style={{ marginTop: 35, marginBottom: 10, height: 120 }}
						justify="center"
						container
						item
						xs={12}
					>
						<Grid style={{ textAlign: "center" }} item xs={12}>
							<Typography
								style={{
									fontWeight: "bold",
									marginBottom: 10,
									display: "block",
								}}
								variant="body2"
							>
								Enter your User Name
							</Typography>
						</Grid>

						<Grid className={classes.textField} item xs={10}>
							<TextField label="User Name" id="handle" />
						</Grid>
					</Grid>

					{/* Select School Form */}
					<Grid container item xs={10}>
						<Grid
							style={{
								background: "#ccc",
								boxShadow:
									"0px 2px 2px -1px rgba(0,0,200,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
								padding: 1,
								borderBottom: "2px solid #64b4f6ef",
								marginBottom: 10,
								minWidth: "80%",
							}}
							container
							justify="center"
							alignItems="center"
							item
						>
							<InfoOutlinedIcon
								style={{ marginRight: 5, color: "#fff" }}
								size="small"
							/>
							<Typography style={{ color: "#fff" }} variant="body2">
								leave as custom if you'd rather not say
							</Typography>
						</Grid>
						<SelectSchoolForm classes={classes} />
						<Grid item xs={2}></Grid>
						<SelectCourseForm classes={classes} />
					</Grid>
					{/*End Select School Form */}

					<Grid item xs={10}>
						<input
							className={classes.button}
							type="button"
							value="Next"
							page="3"
							onClick={e => {
								props.next(e);
								setHandle(getData("handle"));
								setUniversity(getData("university"));
								setCourse(getData("course"));
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
		</form>
	);
};

export const SelectSchoolForm = ({ classes }) => {
	return (
		<Grid container justify="center" item xs={5}>
			<div className={classes.selectForm}>
				<TextField
					select
					label="University"
					fullWidth
					id="university"
					name="university"
					defaultValue="Custom"
					helperText="Select your university"
				>
					{universities.map((option, i) => (
						<MenuItem key={i} value={option}>
							{option}
						</MenuItem>
					))}
				</TextField>
			</div>
		</Grid>
	);
};

export const SelectCourseForm = ({ classes }) => {
	return (
		<Grid container justify="center" item xs={5}>
			<div className={classes.selectForm}>
				<TextField
					select
					label="Course"
					fullWidth
					id="course"
					name="course"
					defaultValue="Custom"
					helperText="Select your course"
				>
					{courses.map((option, i) => (
						<MenuItem key={i} value={option}>
							{option}
						</MenuItem>
					))}
				</TextField>
			</div>
		</Grid>
	);
};
