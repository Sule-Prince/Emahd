import { makeStyles } from "@material-ui/core";
import { HEADER_HEIGHT } from "../../../../utils/constants";

export const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: "auto",
    overflowX: "hidden",
    height: "100%",
    width: "100%",
  },
  headerRoot: {
    alignItems: "center",
    height: `${HEADER_HEIGHT}px`,
  },
  headerNameContainer: {
    flexGrow: 1,
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
    maxHeight: 240,
    maxWidth: 240,
    height: "25vmin",
    width: "25vmin",
    border: "2px solid #fff",
  },
  uploadIconContainer: {
    backgroundColor: "#f0f0f0",
    height: 32,
    width: 32,
    borderRadius: "50%",
    border: "2px solid #fff",
  },
  btnWrapper: {
    marginTop: "1rem",
    "& > *": {
      padding: theme.spacing(0, 1),
      "& > button": {
        boxShadow: theme.shadows[2],
      },
    },
  },
  featureAvatar: {
    width: 50,
    height: 50,
    border: "2px solid #bbb",
  },
  featureAdd: {
    boxShadow: theme.shadows[5],
    color: "#555",
    backgroundColor: "#ececec",
    border: "none",
  },
  featureWrapper: {
    "& > *": {
      paddingBottom: 8,
    },
  },
  featuresWrapper: {
    whiteSpace: "nowrap",
    "& > *": {
      width: 90,
      display: "inline-flex",
    },
  },
  followTab: {
    paddingTop: 15,
    paddingBottom: 12,
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
    maxWidth: "100vw",
    padding: "8px 0px",
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
