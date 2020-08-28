import React from "react";
import { AppBar, Toolbar, Typography, Grid, IconButton, makeStyles} from "@material-ui/core"

import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const useStyles = makeStyles( theme => ({
    headerRoot: {
		position: "-webkit-sticky",
		height: "50px",
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
}))

const Header = ({ showBack, handle, ...props }) => {
    const classes = useStyles();

	return (
        <>
        <CssBaseline />
        <ElevationScroll >
          <AppBar style={{ borderBottom: "1px solid #aaa" }} >
            <Toolbar>
            <Grid className={classes.headerRoot} container>
				<Grid className={classes.headerNameContainer} item>
					{
                        showBack ? (
                            <IconButton color= "primary" style= {{ marginRight: 5}}>
					<KeyboardBackspaceIcon />
					</IconButton>
                        ) : null
                    }
					<Typography className={classes.headerName} variant="caption">
						{handle}
					</Typography>
				</Grid>
			</Grid>
            </Toolbar>
          </AppBar>
          </ElevationScroll>
        </>
	);
};


export default Header;
   
  
function ElevationScroll({ children }) {
    
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }
 
  