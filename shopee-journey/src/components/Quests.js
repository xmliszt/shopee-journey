import {
  Button,
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
} from "@material-ui/core";
import { getTodayQuests } from "../api";
import { makeStyles } from "@material-ui/core/styles";
import { AssignmentTurnedIn, Close, Stars } from "@material-ui/icons";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  listItem: {
    background:
      "linear-gradient(45deg, rgba(299, 83, 34, 0.5), rgba(299, 138, 34, 0))",
  },
  specialListItem: {
    background:
      "linear-gradient(45deg, rgba(299, 83, 34, 0.5), rgba(194, 219, 13, 0.3), rgba(98, 217, 190, 0.1), rgba(299, 138, 34, 0))",
  },
  dialogTitle: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    flexGrow: 1,
  },
  actionButton: {
    background: "linear-gradient(180deg, #f44336 30%, #ff7043 90%)",
    color: "#fff",
  },
}));

function Quests() {
  const [open, setOpen] = useState(false);
  const [dialogQuest, setDialogQuest] = useState(null);
  const [quests, setQuests] = useState([]);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleStartQuest = (quest) => {
    //TODO: Set the targetted quest to "started", start timer if necessary
    console.log(quest);
    console.log("Quest started!");
  };

  useEffect(() => {
    setQuests(getTodayQuests());
  }, []);

  return (
    <div>
      <List
        className={classes.root}
        subheader={<ListSubheader>Today's Quests</ListSubheader>}
      >
        {quests.map((quest) => (
          <ListItem
            button
            key={quest.questID}
            className={quest.isQA ? classes.specialListItem : classes.listItem}
            onClick={() => {
              setDialogQuest(quest);
              setOpen(true);
            }}
          >
            <ListItemIcon>
              {quest.isQA ? <Stars color="primary" /> : <AssignmentTurnedIn />}
            </ListItemIcon>
            <ListItemText>
              <span style={{ fontSize: 12 }}>{quest.title}</span>
            </ListItemText>
            <Chip
              size="small"
              color="primary"
              label={`+${quest.score}`}
              variant="outlined"
            />
          </ListItem>
        ))}
      </List>
      <Dialog
        maxWidth="lg"
        fullWidth
        onClose={handleClose}
        aria-labelledby={dialogQuest === null ? "" : dialogQuest.title}
        open={open}
      >
        <DialogTitle onClose={handleClose}>
          <Toolbar>
            {dialogQuest === null ? null : dialogQuest.isQA ? (
              <Stars color="primary" />
            ) : (
              <AssignmentTurnedIn color="primary" />
            )}
            <Typography variant="body2" className={classes.dialogTitle}>
              {dialogQuest === null ? "" : dialogQuest.title}
            </Typography>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={handleClose}
            >
              <Close color="primary" />
            </IconButton>
          </Toolbar>
          <Chip
            size="small"
            color="primary"
            label={`points: ${dialogQuest === null ? 0 : dialogQuest.score}`}
            variant="outlined"
          />
        </DialogTitle>
        <DialogContent style={{ fontSize: 14 }}>
          {dialogQuest === null ? "" : dialogQuest.content}
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.actionButton}
            onClick={() => {
              handleStartQuest(dialogQuest);
            }}
          >
            Start Quest
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Quests;
