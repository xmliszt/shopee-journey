import { getLevelInfo } from "../api";
import { getProfileInfo } from "../api";
import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

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
  return (currentScore / nextScore) * 100;
};

function Scoredisplay() {
  const classes = useStyles();
  const [profile, setProfile] = useState(null);
  const [levels, setLevels] = useState(null);

  useEffect(() => {
    setProfile(getProfileInfo());
  }, []);

  useEffect(() => {
    setLevels(getLevelInfo());
  }, []);

  return (
    <div className={classes.root}>
      <h4>{profile ? profile["username"] : ""}</h4>
      <h4>Level {profile ? profile["level"] : 0} </h4>
      <BorderLinearProgress
        variant="determinate"
        value={
          profile
            ? calculateProgress(
                profile["score"],
                levels[profile["level"] + 1]["score"]
              )
            : 0
        }
      />
    </div>
  );
}

export default Scoredisplay;
