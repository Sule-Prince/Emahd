import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import {
	Grid,
	Typography,
	TextField,
	MenuItem,
	Select,
	FormHelperText,
} from "@material-ui/core";

const MyInput = ({ classes, data, dataArray, label, setData }) => {
	let dataText;
	dataText = useSelector(state => {
		return state.user.data[data.data];
	});

	const [value, setValue] = useState("");
	useEffect(() => {
		if (dataText) setValue(dataText);
	}, [dataText]);

	const handleChange = e => {
		const value = e.target.value;
		if (setData) setData(value);
		setValue(value);
	};

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
					{data.label}
				</Typography>
			</Grid>
			{label ? (
				<SelectForm
					data={data}
					value={value}
					setData={setData}
					dataArray={dataArray}
				/>
			) : (
				<Grid container justify="center" item xs={12}>
					<TextField
						id={data.data.toLowerCase()}
						style={{ width: "94%" }}
						value={value}
						onChange={handleChange}
						label={data.label}
					/>
				</Grid>
			)}
		</Grid>
	);
};

export default MyInput;

const SelectForm = ({ value, data, dataArray, setData }) => {
	const [label, setLabel] = useState("");
	useEffect(() => {
		if (value) setLabel(value);
	}, [value]);

	return (
		<Grid container justify="center" item xs={12}>
			<div
				style={{
					width: "94%",
				}}
			>
				<Select
					label={data.label}
					fullWidth
					id={data.data}
					name={data.data}
					value={label}
					displayEmpty
					onChange={e => {
						const value = e.target.value;
						if (setData) setData(value);
						setLabel(value);
					}}
				>
					{dataArray.map((option, i) => (
						<MenuItem key={i} value={option}>
							{option}
						</MenuItem>
					))}
				</Select>
				<FormHelperText>{"Select your " + data.label}</FormHelperText>
			</div>
		</Grid>
	);
};
