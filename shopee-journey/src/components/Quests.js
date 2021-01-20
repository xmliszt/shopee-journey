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
  TextField,
} from "@material-ui/core";
import { getTodayQuests, startQuest } from "../api";
import { makeStyles } from "@material-ui/core/styles";
import { Assignment, Close, ContactSupport, Face } from "@material-ui/icons";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  listItem: {
    background:
      "linear-gradient(45deg, rgba(299, 83, 34, 0.5), rgba(299, 138, 34, 0))",
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
  input_block: {
    padding: 10,
    margin: 10,
  },
}));

function Quests() {
  const [open, setOpen] = useState(false);
  const [dialogQuest, setDialogQuest] = useState(null);
  const [quests, setQuests] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
    setHasStarted(false);
  };

  const handleStartQuest = (quest) => {
    console.log(`Quest [${quest.questID}] has started!`);
    startQuest(quest.questID);
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
            className={classes.listItem}
            onClick={() => {
              setDialogQuest(quest);
              setOpen(true);
            }}
          >
            <ListItemIcon>
              {(() => {
                if (quest.questType === "basic") return <Assignment />;
                if (quest.questType === "qa") return <ContactSupport />;
                if (quest.questType === "code_sharing") return <Face />;
              })()}
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
            {(() => {
              if (dialogQuest.questType === "basic")
                return <Assignment color="primary" />;
              if (dialogQuest.questType === "qa")
                return <ContactSupport color="primary" />;
              if (dialogQuest.questType === "code_sharing")
                return <Face color="primary" />;
            })()}
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
          {(() => {
            if (dialogQuest.questType === "qa") {
              return dialogQuest.startedOn !== null || hasStarted ? (
                <div className={classes.input_block}>
                  <TextField
                    id="qa_input"
                    color="primary"
                    style={{ margin: 8 }}
                    label="Your answer..."
                    helperText="Enter your answer to complete the quest"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </div>
              ) : null;
            }
          })()}
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.actionButton}
            onClick={() => {
              handleStartQuest(dialogQuest);
            }}
          >
            {hasStarted
              ? dialogQuest.type !== "basic"
                ? "Submit"
                : "End Quest"
              : "Start Quest"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Quests;
