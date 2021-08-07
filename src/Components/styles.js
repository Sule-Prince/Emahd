import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuList: {
    "& > *": {
      padding: theme.spacing(1, 4),
    },
  },
}));

export default useStyles;
