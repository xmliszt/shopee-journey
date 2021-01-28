import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Stepper from "./Stepper";
import { Button } from "@material-ui/core";


const Profiledisplay = (props) => {
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

  const classes = useStyles();

  const calculateProgress = (currentScore, nextScore) => {
    return Math.round((currentScore / nextScore) * 100);
  };

  
  return (
    <div className={classes.root}>
      <h4>{props.username ? props.username : ""}</h4>
      <h4>Level {props.level ? props.level : 0} </h4>
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
        <BorderLinearProgress
            variant="determinate"
            value={
            props.score
                ? calculateProgress(
                    props.score,
                    props.nextscore
                )
                : 0
            }
        />
        </Box>
        <Box minWidth={55}>
            <Typography variant="body2" color="textSecondary">{
                props.score
                    ? props.score + '/' + props.nextscore
                    : 0}
            </Typography>
        </Box>
      </Box>
      <Button value = '50' onClick = {() => props.onaddscore(50)} >test+50</Button>
      <Stepper/>
    </div>
  );
}

export default Profiledisplay;