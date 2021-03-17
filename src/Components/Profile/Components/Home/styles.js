import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    minHeight: "100vh",
    height: "100%",
    maxHeight: "100vh",
    color: "#000",
    overflow: "hidden",
  },
  appBarRoot: {
    flexGrow: 1,
    marginBottom: 4,
  },
  appBar: {
    backgroundColor: "#fff",
  },
  addFab: {
    boxShadow: theme.shadows[8],
    position: "fixed",
    bottom: 70,
    right: 20,
    height: "calc(45px + 2vmin)",
    width: "calc(45px + 2vmin)",
    color: "#fff",
    zIndex: 10,
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
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

  utilsNavBar: {
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
    textAlign: "center",
    WebkitOverflowScrolling: "touch",
    paddingRight: "1rem",
    paddingBottom: 26,
  },
}));

export default useStyles;
