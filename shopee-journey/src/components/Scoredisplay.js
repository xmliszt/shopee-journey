import { getLevelInfo } from "../api";
import {getProfileInfo} from "../api";
import { useState, useEffect } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import './componentStyles.css';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: 'rgba(244, 67, 54, 0.3)',
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#f44336',
    },
  }))(LinearProgress);

  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });

function Scoredisplay() {
    const classes = useStyles();

    const level = getProfileInfo()['level'];
    const username = getProfileInfo()['username'];
    const currentScore = getProfileInfo()['score'];
    const nextScore = getLevelInfo()[level+1]['score'];
    const progress = (currentScore/nextScore)*100

    return (
        <div className={classes.root}>
            <h4>{username}</h4>
            <h4>Level {level} </h4>
            <BorderLinearProgress variant="determinate" value={50} />
        </div>
    );

}

export default Scoredisplay;