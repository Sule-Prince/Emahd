import React from 'react';

import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles( theme => ({
    progressBar: {
        height: theme.spacing(1),
        backgroundColor: theme.palette.primary["dark"],
        borderRadius: 20,
        margin: 0,
        marginLeft: -5,
        marginBottom: theme.spacing(1)
    }
}))
const ProgressBar = ({ progress }) => {
    const classes = useStyles();
    return (
        <div className= {classes.progressBar} style= {{width: `${progress + 5}%`}} >
            
        </div>
    );
}

export default ProgressBar;
