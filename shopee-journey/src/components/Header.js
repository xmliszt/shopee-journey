import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBack, BarChart } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: "linear-gradient(180deg, #f44336 30%, #ff7043 90%)",
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  leaderboardButton: {},
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.backButton}
            color="inherit"
            aria-label="back"
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Shopee Journey
          </Typography>
          <IconButton
            edge="end"
            className={classes.leaderboardButton}
            color="inherit"
            aria-label="leaderboard"
          >
            <BarChart />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
