import * as React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Stepper from './Stepper';
import { Button, ButtonGroup } from '@material-ui/core';
import { getImageUrl } from 'libraries/utils/url';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const Profiledisplay = (props) => {

  //---------------------------------------------------UI Styling---------------------------------------------------
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

  const classes = useStyles();

  //---------------------------------------------------Utilities---------------------------------------------------

  const calculateProgress = (currentScore, nextScore) => {
    return Math.round((currentScore / nextScore) * 100);
  };


  const clearLocalStorage = () => {
    window.localStorage.clear();
  };

  return (
    <div className={classes.root}>
      <img src={getImageUrl(props.avatar)} width='100' />
      <h4 onClick={clearLocalStorage}>
        {props.username ? props.username : ''}
      </h4>
      <h4>Level {props.level ? props.level : 0} </h4>
      <Box display='flex' alignItems='center' justifyContent='center'>
        <Box width='80%' mr={1}>
          <BorderLinearProgress
            variant='determinate'
            value={
              props.score ? calculateProgress(props.score, props.nextscore) : 0
            }
          />
        </Box>
        <Box minWidth={55}>
          <Typography variant='body2' color='textSecondary'>
            {props.score + '/' + props.nextscore}
          </Typography>
        </Box>
      </Box>
      <Stepper />
    </div>
  );
};

export default Profiledisplay;
