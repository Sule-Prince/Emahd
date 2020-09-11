import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./Components/SignUp/SignUp";
import ForgotPsw from "./Components/Login/ForgotPsw";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import AuthRender from "./Components/AuthRender";
import OtherUserAccount from "./Components/OtherUsersProfile/OtherUserAccount";
// import MySnackBar from "./Components/SubComponents/MySnackBar";


const theme = createMuiTheme({
	overrides: {
		MuiMenuItem: {
			root: {
				fontSize: ".875rem",
			},
		},
		MuiInputBase: {
			root: {
				fontSize: "0.875rem",
			},
			input: "0.875rem",
		},
		MuiInputLabel: {
			root: {
				fontSize: "0.875rem",
			},
		},
		MuiFormControlLabel: {
			root: {
				marginRight: 0,
			},
			label: {
				fontSize: "0.875rem",
			},
		},
	},
	palette: {
		primary: {
			light: "#42a5f5",
			main: "#2196f3",
			dark: "#1976d2",
		},
		secondary: {
			light: "#b2ff59",
			main: "#76ff03",
			dark: "#64dd17",
		},
	},
});

const App = () => {
	const [selectedTab, setSelectedTab] = useState(() => {
		const tabNo = localStorage.getItem("tabNo");
		if (tabNo && tabNo >= 0) return parseInt(tabNo);
		else return 3;
	});
	return (
		<>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<Switch>
							{/* <Route path="/admin" exact component={Dashboard} /> */}
							{/* <Route path="/chat" component={Chat} /> */}
							<Route path="/signup" component={SignUp} />
							<Route path="/forgot" component={ForgotPsw} />

							<Route
								path="/:user"
								render={() => (
									<OtherUserAccount setSelectedTab={setSelectedTab} />
								)}
							/>
						</Switch>
						<Route
							path="/"
							render={() => (
								<AuthRender
									selectedTab={selectedTab}
									setSelectedTab={setSelectedTab}
								/>
							)}
						/>
					</Router>
				</ThemeProvider>
			</Provider>

			{/* <ReactQueryDevtools /> */}
		</>
	);
};
export default App;
