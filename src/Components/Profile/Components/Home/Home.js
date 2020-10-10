//Imported Components
import React, { useState } from "react";
import {
	Avatar,
	makeStyles,
	Fab,
	BottomNavigation,
	BottomNavigationAction,
	Grid,
	Paper,
	Typography,
	Toolbar,
	AppBar,
	Divider,
} from "@material-ui/core";

import { useSelector } from "react-redux";

// Icons
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import CenterFocusStrongIcon from "@material-ui/icons/CenterFocusStrong";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";

// import AvatarSvg from "../../../assets/graphics/profile_pic.svg";
import AstroX from "../../../assets/Astrox.svg";

// Custom Components

import AddScreamPage from "./AddScreamPage";
import Posts from "./Posts";
import useStorage from "../../../../utils/customHooks/useStorage";
import usePostData from "../../../../utils/customHooks/usePostData";
import ProgressBar from "../../../SubComponents/ProgressBar";
import Peer2Peer from "../../../../utils/Peer2Peer";
import Story from "./Story";

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
		marginBottom: 4,
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
	const classes = useStyles();

	return (
		<>
			<div className={classes.root}>
				<HomeAppBar classes={classes} AccountTab={AccountTab} />
				<Divider />
				<NewsFeed classes={classes} />
			</div>
		</>
	);
};

export default React.memo(Home);

const HomeAppBar = ({ classes, AccountTab }) => {
	const userImg = useSelector(state => state.user.data.imageUrl);

	return (
		<div className={classes.appBarRoot}>
			<AppBar position="static" elevation={3} className={classes.appBar}>
				<Toolbar>
					<span
						className={classes.menuButton}
						onClick={AccountTab}
						aria-label="profile "
					>
						<Avatar
							style={{
								height: 40,
								width: 40,
								border: "1px solid #999",
							}}
							src={userImg || null}
						/>
					</span>
					<Typography variant="h6" className={classes.title}>
						<img src={AstroX} alt="" />
						<span>EMahd</span>
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
};

const NewsFeed = () => {
	const [selected, setSelected] = useState(0);

	const handleChange = (e, newSelected) => {
		setSelected(newSelected);
	};

	return (
		<>
			<Grid item xs={12}>
				<Paper elevation={1}>
					<BottomNavigation
						value={selected}
						onChange={handleChange}
						variant="fullWidth"
						aria-label="Posts and Screams"
					>
						<BottomNavigationAction
							icon={<BubbleChartIcon fontSize="large" />}
							style={{ paddingBottom: 0 }}
						/>

						<BottomNavigationAction
							icon={<CenterFocusStrongIcon fontSize="large" />}
							style={{ paddingBottom: 0 }}
						/>
					</BottomNavigation>
				</Paper>
			</Grid>
			{selected === 0 && <Media />}

			{selected === 1 && <Screams />}
		</>
	);
};

const Screams = () => {
	const { posts } = useSelector(state => state.posts);
	const postData = usePostData();
	const [styles, setStyles] = useState("110vh");

	const [file, setFile] = useState(null);
	const [scream, setScream] = useState("");

	const { progress, storeData } = useStorage(file, setScream, postData);

	const openAddScreamPage = e => {
		setStyles("0px");
	};

	return (
		<>
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
				<AddRoundedIcon fontSize="small" />
			</Fab>
		</>
	);
};

const Media = ({ classes }) => {
	const [displayStory, setDisplayStory] = useState(false);
	return (
		<div>
			{displayStory && <Story classes={classes} setDisplay={setDisplayStory} />}
			<div>
				<div
					style={{
						padding: 5,
						display: "inline-flex",
						justifyContent: "center",
						flexDirection: "column",
					}}
				>
					<Fab
						style={{
							height: 62,
							width: 62,
							marginBottom: 5,
							background:
								"linear-gradient(45deg, #6a1b9a, #aa00ff, #2196f3, #42a5f5)",
						}}
						onClick={() => {
							setDisplayStory(true);
						}}
					>
						<AddRoundedIcon style={{ fontSize: 40, color: "#fff" }} />
					</Fab>
					<Typography align="center" variant="body2">
						Your Story
					</Typography>
				</div>
			</div>

			<Divider />
			{/* <Peer2Peer /> */}
		</div>
	);
};
