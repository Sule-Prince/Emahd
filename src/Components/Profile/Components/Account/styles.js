import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
	root: {
		overflowY: "auto",
		overflowX: "hidden",
		height: "100vh",
		width: "100vw"
	},
	headerRoot: {
		position: "-webkit-sticky",
		height: "45px",
		alignItems: "center",
		top: "0",
	},
	headerNameContainer: {
		flexGrow: 1,
		// fontWeight: theme.typography.fontWeightBold,
		paddingLeft: "1rem",
	},

	headerName: {
		fontWeight: theme.typography.fontWeightBold,
	},
	
	coverPhoto: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		objectFit: "cover",
		width: "100%",
		background:
			"linear-gradient(360deg, #3f51b5 0%, #2196f3 75%, #64b5f6 100%)",
		height: 250,
		textAlign: "center",
		"& > *": {
			color: "#fff",
		},
	},
	avatarContainer: {
		transform: "translateY(-60px)",
		zIndex: 1,
	},
	avatar: {
		minHeight: "120px",
		minWidth: "120px",
		border: "2px solid #fff",
	},
	uploadIconContainer: {
		backgroundColor: "#f0f0f0",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: 32,
		width: 32,
		borderRadius: "50%",
		border: "2px solid #fff",
	},
	followTab: {
		paddingTop: 15,
		"& > *": {
			textAlign: "center",

			"& > span": {
				fontWeight: theme.typography.fontWeightBold,
			},
		},
	},
	utilsNavBar: {
		overflowX: "auto",
		overflowY: "hidden",
		whiteSpace: "nowrap",
		textAlign: "center",
		WebkitOverflowScrolling: "touch",
		height: 250,
		paddingRight: "1rem",
	},
	
	// Other User Account Styles
	loadingRoot: {
		position: "fixed",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1000,
		backgroundColor: "#fff",
	},
	loadingDiv: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
}));
