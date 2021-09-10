import { makeStyles } from "@material-ui/core";

const useExtraStyles = makeStyles((theme) => ({
  avatar: {
    height: 38,
    width: 38,
  },
  commentContainer: {
    padding: "10px 5px",
    paddingBottom: 12,
  },
  media: {
    height: "auto",
    width: "100%",
  },
  multiMedia: {
    width: "100%",
    height: "auto",
    position: "absolute",
    top: 0,
    left: 0,
  },
  cardContent: {
    paddingTop: 8,
    paddingBottom: "16px !important",
  },
}));

export default useExtraStyles;
