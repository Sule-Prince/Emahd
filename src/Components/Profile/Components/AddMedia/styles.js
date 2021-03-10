import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "calc(100% - 56px)",
    height: "calc(100% - 56px)",
    width: "100vw",
    overflowY: "auto",
    position: "relative",
    background: "linear-gradient(45deg, #fff, #888)",
  },
  mediaContainer: {
    boxShadow: theme.shadows[2],
    height: "90%",
    backgroundColor: "#fff",
    borderRadius: "0px 0px 30px 30px",
    overflowY: "auto",
    transition: "all 1s cubic-bezier(0, .4, .6, 1)",
    width: "100vw",
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
  addRoot: {
    marginTop: -28,
  },
  addFab: {
    boxShadow: theme.shadows[8],
    height: "calc(60px + 2vmin)",
    width: "calc(60px + 2vmin)",
    marginBottom: 5,
    backgroundColor: "#2196f3",
    transition: "all .5s ease-out",
  },
}));

export default useStyles;
