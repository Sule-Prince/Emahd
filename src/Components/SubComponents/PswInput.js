import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const PswInput = ({ password, setPassword, error }) => {
	const [values, setValues] = useState({
		showPassword: false,
	});

	const handleClickShowPassword = () => {
		setValues({ showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const handleChange = (e, setData) => {
		setData(e.target.value);
	};

	return (
		<FormControl fullWidth>
			<InputLabel htmlFor="password">Password</InputLabel>
			<Input
				id="password"
				name="psw"
				value={password}
				error= {error.hasError}
				onChange={e => {
					handleChange(e, setPassword);
				}}
				type={values.showPassword ? "text" : "password"}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
						>
							{values.showPassword ? (
								<Visibility color="primary" />
							) : (
								<VisibilityOff color="primary" />
							)}
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
	);
};

export default PswInput;
