import React from "react";
import { IconButton, MenuItem, Select } from "@material-ui/core";
import TextFieldsIcon from "@material-ui/icons/TextFields";

const FontsSelectOptions = ({ setFontFamily, fontFamily }) => {
	const fontsArray = [
		"Tahoma",
		"'Fredoka One', cursive",
		"'Grenze Gotisch', cursive",
		"'Lobster', cursive",
		"'Fugaz One', cursive",
		"'Nosifer', cursive",
		"'Ewert', cursive",
	];
	return (
		
			<IconButton style={{ position: "relative", right: 10, top: 0 }}>
				<TextFieldsIcon color="primary" fontSize="large" />

				<Select
					id="fontOptions"
					value={fontFamily}
					style={{
						height: 6,
						width: 6,
						position: "absolute",
						zIndex: 1,
						top: "50%",
						left: "36%",
						marginLeft: -10,
						transform: "translate(-50%, -50%)",
					}}
					onChange={e => {
						const value = e.target.value;
						setFontFamily(value);
					}}
				>
					{fontsArray.map((option, i) => (
						<MenuItem key={i} value={option}>
							{option}
						</MenuItem>
					))}
				</Select>
			</IconButton>
	);
};

export default FontsSelectOptions;
