//Imported Components
import React, { useState } from "react";
import {
	Avatar,
	makeStyles,
	Fab,
	IconButton,
	Typography,
	Toolbar,
	AppBar,
} from "@material-ui/core";

import { useSelector } from "react-redux";

// Icons
import AddIcon from "@material-ui/icons/Add";

// import AvatarSvg from "../../../assets/graphics/profile_pic.svg";
import AstroX from "../../../assets/Astrox.svg";

// Custom Components

import AddScreamPage from "./AddScreamPage";
import Posts from "./Posts";
import useStorage from "../../../../utils/customHooks/useStorage";
import ProgressBar from "../../../SubComponents/ProgressBar";

// Component Styling

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: "#fff",
		minHeight: "100vh",
		color: "#000",
		overflowY: "auto",
	},
	appBarRoot: {
		flexGrow: 1,
	},
	appBar: {
		backgroundColor: "#fff",
	},
	RefreshIcon: {
		marginTop: -28,
		position: "absolute",
		zIndex: 1000,
		left: "calc(50% - 24px)",
		color: "rgb(0, 96, 139)",
	},
	menuButton: {
		color: "#aaa",
	},
	title: {
		flexGrow: 1,
		textAlign: "center",
		color: "rgb(0, 96, 139)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontWeight: "bold",
		paddingRight: 59,
		"& > img": {
			height: "2rem",
			width: "2rem",
		},
		"& > span": {
			marginLeft: -6,
			fontFamily: "Lobster Two, cursive",
		},
	},

	posts: {
		marginBottom: "1rem",
		padding: "1rem .7rem",
	},
}));

const Home = ({ AccountTab }) => {
	const { posts } = useSelector(state => state.posts);

	const [styles, setStyles] = useState("110vh");

	const [file, setFile] = useState(null);
	const [scream, setScream] = useState("");
	const { progress, storeData, error } = useStorage(file, setScream);

	const classes = useStyles();
	const openAddScreamPage = e => {
		setStyles("0px");
	};

	return (
		<>
			<div className={classes.root}>
				<HomeAppBar classes={classes} AccountTab={AccountTab} />

				{progress ? <ProgressBar progress={progress} /> : null}
				<Posts posts={posts} />

				<AddScreamPage
					styles={styles}
					setStyles={setStyles}
					file={file}
					setFile={setFile}
					setScream={setScream}
					storeData={storeData}
					scream={scream}
				/>

				<Fab
					color="primary"
					size="small"
					style={{ position: "fixed", bottom: 70, right: 20 }}
					onClick={openAddScreamPage}
				>
					<AddIcon fontSize="small" />
				</Fab>
			</div>
		</>
	);
};

export default React.memo(Home);

const HomeAppBar = ({ classes, AccountTab }) => {
	const userImg = useSelector(state => state.user.data.imageUrl);

	return (
		<div className={classes.appBarRoot}>
			<AppBar position="static" className={classes.appBar}>
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						onClick={AccountTab}
						color="inherit"
						aria-label="profile "
					>
						<Avatar
							style={{
								height: "35px",
								width: "35px",
								border: "1px solid #999",
							}}
							src={userImg || null}
						/>
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						<img src={AstroX} alt="" />
						<span>EMahd</span>
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
};
