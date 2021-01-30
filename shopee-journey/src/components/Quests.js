import * as React from 'react';
import {
  Button,
  Grid,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Toolbar,
  Typography,
  IconButton,
  Chip,
  TextField,
  Snackbar,
  ButtonGroup,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { getTodayQuests, startQuest, endQuest } from '../api';
import { makeStyles } from '@material-ui/core/styles';
import {
  Assignment,
  Close,
  ContactSupport,
  Face,
  CheckCircle,
} from '@material-ui/icons';
import { useState, useEffect } from 'react';
import Bridge from 'libraries/bridges';
import { getShopUrl } from 'libraries/utils/url';
// import './Quests.css';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
  },
  listItem: {
    borderRadius: 15,
    border: '2px solid',
    borderColor: 'rgba(225,82,65,0.5)'
  },
  dialogTitle: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    flexGrow: 1,
  },
  actionButton: {
    background: 'linear-gradient(180deg, #f44336 30%, #ff7043 90%)',
    color: '#fff',
  },
  input_block: {
    padding: 10,
    margin: 10,
  },
}));

function Quests(props) {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStyle, setAlertStyle] = useState('info');
  const [dialogQuest, setDialogQuest] = useState(null);
  const [quests, setQuests] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [userInput, setUserInput] = useState('');
  const classes = useStyles();

  const handleAlertClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setHasStarted(false);
  };

  const pushAlert = (msg, style) => {
    setAlertMsg(msg);
    setAlertStyle(style);
    setAlertOpen(true);
  };

  const isCorrectAnswer = (userInput, answers) => {
    for (var answer of answers) {
      if (userInput.toLowerCase() === answer.toLowerCase()) return true;
    }
    return false;
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleQuestAction = (quest) => {
    if (quest.startedOn == null) {
      startQuest(quest.questID);
      pushAlert('Quest has started!', 'warning');
      if (quest.questType === 'qa') {
        setQuests(getTodayQuests());
        setOpen(false);
        Bridge.push(getShopUrl(quest.shopeId));
      }
    } else {
      if (quest.questType === 'qa') {
        if (!isCorrectAnswer(userInput, quest.answer)) {
          pushAlert('Ooops! Answer is not correct. Try again!', 'warning');
          return;
        }
      }
      endQuest(quest.questID);
      props.onaddscore(quest.score);
      pushAlert(
        `Quest has finished! You have gained +${quest.score} points!`,
        'success'
      );
    }
    setQuests(getTodayQuests());
    setOpen(false);
  };

  const handleVisitShop = (quest) => {
    Bridge.push(getShopUrl(quest.shopeId));
  };

  useEffect(() => {
    setQuests(getTodayQuests());
  }, []);

  return (
    <div>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity={alertStyle}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <div style={{display:"flex", justifyContent:"center"}}>

        <List
          className={classes.root}
          subheader={<ListSubheader>Today's Quests</ListSubheader>}
        >
          {quests.map((quest) => (
            <div style={{marginBottom:10}}>
              <ListItem
                button
                key={quest.questID}
                className={classes.listItem}
                onClick={() => {
                  setDialogQuest(quest);
                  setOpen(true);
                }}
                disabled={quest.isDone}
              >
                <ListItemIcon>
                  {(() => {
                    if (quest.isDone) return <CheckCircle color='primary' />;
                    if (quest.questType === 'basic')
                      return (
                        <Assignment
                          color={quest.startedOn !== null ? 'primary' : 'inherit'}
                        />
                      );
                    if (quest.questType === 'qa')
                      return (
                        <ContactSupport
                          color={quest.startedOn !== null ? 'primary' : 'inherit'}
                        />
                      );
                    if (quest.questType === 'code_sharing')
                      return (
                        <Face
                          color={quest.startedOn !== null ? 'primary' : 'inherit'}
                        />
                      );
                  })()}
                </ListItemIcon>
                <ListItemText>
                  <span style={{ fontSize: 12 }}>{quest.title}</span>
                </ListItemText>
                <Chip
                  size='small'
                  color='primary'
                  label={`+${quest.score}`}
                />
              </ListItem>
            </div>
          ))}
        </List>

      </div>
      <Dialog
        maxWidth='lg'
        fullWidth
        onClose={handleClose}
        aria-labelledby={dialogQuest === null ? '' : dialogQuest.title}
        open={open}
      >
        <DialogTitle onClose={handleClose}>
          <Toolbar>
            {(() => {
              if (dialogQuest !== null) {
                if (dialogQuest.questType === 'basic')
                  return <Assignment color='primary' />;
                if (dialogQuest.questType === 'qa')
                  return <ContactSupport color='primary' />;
                if (dialogQuest.questType === 'code_sharing')
                  return <Face color='primary' />;
              }
            })()}
            <Typography variant='body2' className={classes.dialogTitle}>
              {dialogQuest === null ? '' : dialogQuest.title}
            </Typography>
            <IconButton
              aria-label='close'
              className={classes.closeButton}
              onClick={handleClose}
            >
              <Close color='primary' />
            </IconButton>
          </Toolbar>
          <Chip
            size='small'
            color='primary'
            label={`points: ${dialogQuest === null ? 0 : dialogQuest.score}`}
            variant='outlined'
          />
        </DialogTitle>
        <DialogContent style={{ fontSize: 14 }}>
          {dialogQuest === null ? '' : dialogQuest.content}
          {(() => {
            if (dialogQuest !== null) {
              if (dialogQuest.questType === 'qa') {
                return dialogQuest.startedOn !== null || hasStarted ? (
                  <div className={classes.input_block}>
                    <TextField
                      id='qa_input'
                      color='primary'
                      style={{ margin: 8 }}
                      label='Your answer...'
                      helperText='Enter your answer to complete the quest'
                      fullWidth
                      autoComplete={false}
                      margin='normal'
                      variant='outlined'
                      value={userInput}
                      onChange={handleInputChange}
                    />
                  </div>
                ) : null;
              }
            }
          })()}
        </DialogContent>
        <DialogActions>
          {dialogQuest != null ? (
            dialogQuest.startedOn !== null || hasStarted ? (
              dialogQuest.questType === 'basic' ? (
                <Button
                  className={classes.actionButton}
                  onClick={() => {
                    handleQuestAction(dialogQuest);
                  }}
                >
                  Finish Quest
                </Button>
              ) : dialogQuest.questType === 'qa' ? (
                <ButtonGroup>
                  <Button
                    className={classes.actionButton}
                    onClick={() => {
                      handleVisitShop(dialogQuest);
                    }}
                  >
                    Visit Shop
                  </Button>
                  <Button
                    className={classes.actionButton}
                    onClick={() => {
                      handleQuestAction(dialogQuest);
                    }}
                  >
                    Submit
                  </Button>
                </ButtonGroup>
              ) : dialogQuest.questType === 'code_sharing' ? (
                <Button
                  className={classes.actionButton}
                  onClick={() => {
                    handleQuestAction(dialogQuest);
                  }}
                >
                  Connect With Friends
                </Button>
              ) : (
                ''
              )
            ) : (
              <Button
                className={classes.actionButton}
                onClick={() => {
                  handleQuestAction(dialogQuest);
                }}
              >
                Start Quest
              </Button>
            )
          ) : (
            ''
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Quests;
