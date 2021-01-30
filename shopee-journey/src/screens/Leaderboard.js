import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Header from '../components/Header';
import {
  Typography,
  Box,
  Divider,
  List,
  Avatar,
  ListItem,
  ListItemAvatar,
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useState, useEffect } from 'react';
import { getUserConnections, getLevelMaxScore, getProfileInfo } from '../api';
import './Leaderboard.css';

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'gothamExtraLight',
    src: 'url(../fonts/gotham-extralight.ttf)',
    fontStyle: 'normal',
    marginTop: 60,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: 8,
  },
}));

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let userData = getUserConnections();
    const myProfileInfo = getProfileInfo();
    const myData = {
      name: myProfileInfo.name,
      score: myProfileInfo.score,
      level: myProfileInfo.level,
      image: myProfileInfo.image,
    };
    console.log(myData);
    console.log(userData);
    userData = [myData, ...userData];
    userData.sort(function(a, b) {
      return b.score - a.score;
    });
    setUsers(userData);
  }, []);

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

  const classes = useStyles();

  return (
    <div>
      <Header title='Leaderboard' />
      <List className={classes.root}>
        {users.map((user, index) => (
          <ListItem key={index}>
            <div style={{ width: '100%' }}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <h1 class='ranking'>{index + 1}</h1>
                  <ListItemAvatar>
                    <Avatar className={classes.large} src={user.image} />
                  </ListItemAvatar>
                  <div style={{ width: '200px' }}>
                    <Typography style={{ fontSize: 15 }}>
                      {user.name}
                    </Typography>
                    <Box>
                      <Box width='100%' mr={1}>
                        <BorderLinearProgress
                          color='primary'
                          variant='determinate'
                          value={Math.round(
                            (user.score / getLevelMaxScore(user.level)) * 100
                          )}
                        />
                      </Box>
                      <Box minWidth={55}></Box>
                    </Box>
                  </div>
                </div>
                <div style={{ marginTop: 13, width: 80, marginLeft: 10 }}>
                  <Typography class='points' style={{ fontSize: 13 }}>
                    {user.score}/{getLevelMaxScore(user.level)}
                  </Typography>
                  <Typography
                    class='level'
                    style={{ fontSize: 10, color: 'grey' }}
                  >
                    Level {user.level}
                  </Typography>
                </div>
              </div>
              <Divider component='li' style={{ marginTop: 15 }} />
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Leaderboard;
