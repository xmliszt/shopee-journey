import * as React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { getLevelInfo, getProfileInfo } from '../api';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import RedeemIcon from '@material-ui/icons/Redeem';
import ExploreIcon from '@material-ui/icons/Explore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import StepConnector from '@material-ui/core/StepConnector';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  unlocked: {
    color: '#f44336',
  },
  locked: {
    color: 'rgba(244, 67, 54, 0.3)',
  },
  activeUnlocked: {
    color: '#ffffff',
    backgroundColor: '#f44336',
  },
  activeLocked: {
    color: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(244, 67, 54, 0.3)',
  },

}));


function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function getSteps() {
  let levelsData = getLevelInfo();
  let levels = [];
  Object.keys(levelsData).forEach((l) => {
    levels.push(l);
  });
  return levels;
}

function getStepContent(step) {
  return getLevelInfo()[step + 1]['promo'];
}

export default function HorizontalNonLinearStepper() {
  const classes = useStyles();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState('');
  const [alertStyle, setAlertStyle] = React.useState('info');
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  const pushAlert = (msg, style) => {
    setAlertMsg(msg);
    setAlertStyle(style);
    setAlertOpen(true);
  };

  const handleAlertClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  const currentLevel = getProfileInfo()['level'];

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    pushAlert('Reward claimed!', 'success');
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const isUnlocked = (cLvl, cStep) => {
    return cLvl + 1 > cStep;
  };

  const getIcon = (index,cLvl,cStep) => {
    if (cStep != index){
      if (index+1 == cLvl && completed[index]) {
        return <div> <PersonPinCircleIcon className={classes.unlocked}/> </div>
      } else if (completed[index]) {
        return <div> <CheckCircleIcon className={classes.unlocked}/> </div>
      } else if (index+1 > cLvl) {
        return <div> <ExploreIcon className={classes.locked}/> </div>
      } else {
        return <div> <RedeemIcon className={classes.unlocked}/> </div>
      }
    } else {
      if (index+1 == cLvl && completed[index]) {
        return <div> <PersonPinCircleIcon className={classes.activeUnlocked}/> </div>
      } else if (completed[index]) {
        return <div> <CheckCircleIcon className={classes.activeUnlocked}/> </div>
      } else if (index+1 > cLvl) {
        return <div> <ExploreIcon className={classes.activeLocked}/> </div>
      } else {
        return <div> <RedeemIcon className={classes.activeUnlocked}/> </div>
      }
    }
  }

  return (
    <div className={classes.root}>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity={alertStyle}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <Stepper nonLinear activeStep={activeStep} alternativeLabel  >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              onClick={handleStep(index)}
              completed={completed[index]}
              icon={getIcon(index,currentLevel,activeStep)}
            >{label}</StepButton>
            
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All rewards have been claimed. Stay tuned for more.
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant='caption' className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleComplete}
                    disabled={isUnlocked(activeStep, currentLevel)}
                  >
                    Claim Reward
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
