import React from 'react';
import { Avatar, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import ClearIcon from "@material-ui/icons/Clear"
// import "./test.css"

const useStyles = makeStyles((theme) => ({
    root: {
        border: `1.2px solid ${theme.palette.grey[300]}`,
        padding: theme.spacing(1),
        margin: theme.spacing(2.5),
        borderRadius: "3px",
        maxWidth: 130,
        zIndex: -1
    },
    header: {
        color: theme.palette.grey[400],
        height: "15px",

    },
    photoContainer: {
        paddingBottom: theme.spacing(1)
    },
    channelPhoto: {
        height: theme.spacing(10),
        width: theme.spacing(10)
    },
    channelUserName: {
        fontWeight: theme.typography.fontWeightBold
    },
    channelName: {
        
    },
    btnContainer: {
        paddingTop: "8px",
        width:"100%",
       
    },
    btn: {
        letterSpacing: ".5px",
        fontWeight: theme.typography.fontWeightMedium,
        textTransform: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "95%",
        // height: "20px",
        padding: "4px 0px",
        backgroundColor: theme.palette.primary["main"],
        borderRadius: 2,
        color: "#fff",
    }
}))


const FollowCard = () => {
    const classes = useStyles()
    return (
        <Grid container item className={classes.root} zeroMinWidth alignItems="center" direction="column">
            <Header classes={classes} />
            <ChannelPhoto classes={classes} />
            <ChannelUserName classes= {classes} />
            <ChannelName classes={classes} />
            <FollowButton classes={classes} />
        </Grid>
    );
}

export default FollowCard;

const Header = ({ classes }) => {

    return (
        <Grid container justify="flex-end">
            <Grid container item xs={2} > <ClearIcon className={classes.header} /></Grid>
        </Grid>
    )
}

const ChannelPhoto = ({ classes }) => {

    return (
        <div className={classes.photoContainer}>
            <Avatar className={classes.channelPhoto} />
        </div>
    )
}

const ChannelUserName = ({classes}) => {

    return (
        <Typography className={classes.channelUserName} variant="body2"> Sule Prince </Typography>
    )
}
const ChannelName = ({classes}) => {

    return (
        <Typography className={classes.channelName} color="textSecondary" variant="caption" >@Savage_Kvng</Typography>    
        )
}

const FollowButton = ({ classes }) => {

    return (
        <div className={classes.btnContainer}>
            <button size="small" color="primary" className={classes.btn} variant="contained">Follow
                <span className= "MuiTouchRipple-root"></span>
            </button>

        </div>
    )
}
