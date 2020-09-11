import React, { useState } from "react";

import {
	makeStyles,
	Grid,
	Paper,
	Typography,
	IconButton,
	TextField,
	Button,
} from "@material-ui/core";


import { useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "../../../SubComponents/Header";

const useStyles = makeStyles(theme => ({
	root: {
		height: "100vh",
		width: "100vw",
		backgroundColor: theme.palette.background.paper,
		zIndex: 10000,
		overflowY: "auto",
		transition: "all .5s cubic-bezier(0, .4, .6, 1)",
		position: "absolute",
		top: 0,
	},
	dataContainer: {
		marginBottom: 8,
	},
}));

const EdituserInfo = ({ setDisplay }) => {
	const classes = useStyles();

	const editablesArray = ["fullName", "Bio", "Email", "University", "Course"];
	return (
		<Grid container className={classes.root} style= {{ display: "initial"}} >
			<Header setDisplay={setDisplay} data= "Edit Profile" />

			<Grid container>
				{editablesArray.map(data => (
					<EditContent key= {data} classes={classes} data={data} />
				))}
			</Grid>

                    {/* Update Data Button */}
           
           <div style= {{padding: "1rem 0px"}}>
           

			<Grid container justify= "center" item xs={12}>
				<Button
					style={{ padding: 8, width: "94%", marginTop: 16 }}
                    variant= "outlined"
					color="primary"
					
				>
					Update Data
				</Button>
			</Grid>
           </div>

			
		</Grid>
	);
};

export default React.memo(EdituserInfo);

const EditContent = ({ classes, data }) => {
	let dataText;
	dataText = useSelector(state => {
		if(data === "fullName") return state.user.data[data]

		return state.user.data[data.toLowerCase()]
	});
	
	const [value, setValue] = useState("")
	useEffect(() => {
		if(dataText) setValue(dataText)

	}, [dataText])

	const handleChange = e => setValue(e.target.value)
	
	return (
		<Grid className={classes.dataContainer} container item xs={12}>
			<Grid item xs={12}>
				<Typography
					style={{
						fontWeight: "bold",
						textAlign: "center",
						margin: "10px 0px",
					}}
					variant="body2"
					component="div"
				>
					{data}
				</Typography>
			</Grid>
			<Grid container justify="center" item xs={12}>
				<TextField
					id={data.toLowerCase()}
					style={{ width: "94%" }}
					value={value}
					onChange= {handleChange}
					label={data}
				/>
			</Grid>
		</Grid>
	);
};




