import { getLevelInfo, getProfileInfo, addScore} from "../api";
import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Stepper from "./Stepper";
import { Button } from "@material-ui/core";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "rgba(244, 67, 54, 0.3)",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#f44336",
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const calculateProgress = (currentScore, nextScore) => {
  return Math.round((currentScore / nextScore) * 100);
};


function Scoredisplay() {
  const classes = useStyles();
  const [profile, setProfile] = useState(getProfileInfo());
  const levels = getLevelInfo()

  
  // useEffect(() => {
  //   console.log("I am here");
  //   function handleProfileChange() {
  //     console.log("I am inside");
  //     setProfile(getProfileInfo());
  //   }
  //   window.addEventListener('storage',handleProfileChange);
  //   return () => {
  //     window.removeEventListener('storage',handleProfileChange)
  //   }
  //   // console.log('am I spamming?')
  //   // setProfile(getProfileInfo());
  // },[]);

  useEffect(() => {
    setProfile(getProfileInfo());
  },[]);

  

  return (
    <div className={classes.root}>
      <h4>{profile ? profile["username"] : ""}</h4>
      <h4>Level {profile ? profile["level"] : 0} </h4>
      <Box display="flex" alignItems="center">
        <Box minWidth={55}>
            <Typography variant="body2" color="textSecondary">{
                profile
                    ? profile["score"] + '/' + levels[profile["level"]]["score"]
                    : 0}
            </Typography>
        </Box>
        <Box width="100%" mr={1}>
        <BorderLinearProgress
            variant="determinate"
            value={
            profile
                ? calculateProgress(
                    profile["score"],
                    levels[profile["level"]]["score"]
                )
                : 0
            }
        />
        </Box>
        
      </Box>
      <Button onClick={() => addScore(50)}>test+50</Button>
      <Stepper/>
    </div>
  );
}

export default Scoredisplay;
