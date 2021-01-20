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
import { AssignmentTurnedIn, Close } from "@material-ui/icons";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  listItem: {
    background:
      "linear-gradient(45deg, rgba(299, 83, 34, 0.3), rgba(299, 138, 34, 0))",
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
  const [diaglogQuest, setDialogQuest] = useState(null);
  const [quests, setQuests] = useState([]);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
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
              <AssignmentTurnedIn color="primary" />
            </ListItemIcon>
            <ListItemText>{quest.title}</ListItemText>
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
        aria-labelledby={diaglogQuest === null ? "" : diaglogQuest.title}
        open={open}
      >
        <DialogTitle onClose={handleClose}>
          <Toolbar>
            <AssignmentTurnedIn color="primary" />
            <Typography variant="body2" className={classes.dialogTitle}>
              {diaglogQuest === null ? "" : diaglogQuest.title}
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
            label={`points: ${diaglogQuest === null ? 0 : diaglogQuest.score}`}
            variant="outlined"
          />
        </DialogTitle>
        <DialogContent style={{ fontSize: 14 }}>
          {diaglogQuest === null ? "" : diaglogQuest.content}
        </DialogContent>
        <DialogActions>
          <Button className={classes.actionButton}>Start Quest</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Quests;
