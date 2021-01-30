import { makeStyles, withStyles } from "@material-ui/core/styles";
import {Typography, Box, AppBar, Toolbar, IconButton, Divider, List, Avatar, ListItem, ListItemAvatar} from "@material-ui/core";
import {Equalizer, Close} from "@material-ui/icons";
import LinearProgress from "@material-ui/core/LinearProgress";
import { deepOrange, deepPurple, pink } from '@material-ui/core/colors';
import "./Leaderboard.css";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
    appBar: {
      background: "linear-gradient(-180deg,#f53d2d,#f63)",
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
        const userData = [{
            name: "Alice",
            level: 3,
            points: 230,
            maxPointForLevel: 400,
            image: 'https://i.ibb.co/z8VspcG/Zanm-OYHX-400x400.jpg',
        },
        {
            name: "Bob",
            level: 1,
            points: 10,
            maxPointForLevel: 30,
            image: 'https://i.ibb.co/Phd5xDM/u-https-tse1-mm-bing-net-th-id-OIP.jpg',
        },
        {
            name: "Charlie",
            level: 2,
            points: 120,
            maxPointForLevel: 200,
            image: 'https://i.ibb.co/qmwmz90/spongebob.jpg',
        }];
        userData.sort(function(a,b) {
            return b.points - a.points;
        });
        setUsers(userData);
    }, [])

    const BorderLinearProgress = withStyles((theme) => ({
        root: {
          height: 10,
          borderRadius: 5,
        },
        colorPrimary: {
          backgroundColor: "rgba(244, 67, 54, 0.3)",
        },
        bar: {
          borderRadius: 5,
          backgroundColor: "#f44336",
        },
      }))(LinearProgress);
    
    const classes = useStyles();

        
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <div style={{width: "100%"}}>
                <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <Equalizer style={{ fontSize: 26}}/>
                        <Typography variant="h6">
                            Leaderboard
                        </Typography>
                    </div>
                    <IconButton style={{color:"white", fontSize:20}}>
                        <Close />
                    </IconButton>
                </Toolbar>
                </div>
            </AppBar>

            <List className={classes.root}>
                {
                    users.map((user, index) => <ListItem >
                        <div style={{width: "100%"}}>
                        <div style={{width:"100%", display: "flex", justifyContent: "space-between"}}>
                        <div style={{width:"100%", display:"flex", alignItems:"center"}}>
                            <h1 class="ranking">{index + 1}</h1>
                            <ListItemAvatar>
                            <Avatar className={classes.large} src={user.image} />
                            </ListItemAvatar>
                            <div style={{width: "200px"}}>                            
                                <Typography style={{fontSize:15}}>
                                        {user.name}
                                    </Typography>
                                <Box >
                                <Box width="100%" mr={1}>
                                <BorderLinearProgress
                                    color='primary'
                                    variant="determinate"
                                    value={Math.round(user.points/user.maxPointForLevel * 100)}
                                />
                                </Box>
                                <Box minWidth={55}>
                                </Box>
                                </Box>
                            </div>
                        </div>
                        <div style={{marginTop: 13, width:80, marginLeft:10}}>
                            <Typography class='points' style={{fontSize:13}}>
                                {user.points}/{user.maxPointForLevel}
                            </Typography>
                            <Typography class='level' style={{fontSize:10, color:"grey"}}>
                                Level {user.level}
                            </Typography>
                        </div>
                        </div>
                        <Divider component="li" style={{marginTop: 15}} />

                        </div>
                    </ListItem>
                    )
                }
            </List>


            
        </div>
    )
}

export default Leaderboard;