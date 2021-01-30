import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBack, BarChart } from '@material-ui/icons';
import { Link, LinkBack } from 'libraries/components/Link';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  appBar: {
    background: 'linear-gradient(-180deg,#f53d2d,#f63)',
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header(props) {
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
            {props.title}
          </Typography>
          <Link to='/browse?q=canon'>
            <IconButton edge='end' aria-label='leaderboard'>
              <BarChart style={{ color: '#fff' }} />
            </IconButton>
          </Link>
          <Link to='/vouchers'>
            <IconButton edge='end' aria-label='vouchers'>
              <ConfirmationNumberIcon style={{ color: '#fff' }} />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
