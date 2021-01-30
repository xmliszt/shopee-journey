import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBack, BarChart } from '@material-ui/icons';
import { LinkBack } from 'libraries/components/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: 'linear-gradient(-180deg,#f53d2d,#f63)',
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
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <LinkBack className={classes.backButton}>
            <IconButton edge='start' aria-label='back'>
              <ArrowBack style={{ color: '#fff' }} />
            </IconButton>
          </LinkBack>
          <Typography variant='h6' className={classes.title}>
            Shopee Journey
          </Typography>
          <IconButton
            edge='end'
            className={classes.leaderboardButton}
            color='inherit'
            aria-label='leaderboard'
          >
            <BarChart />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
