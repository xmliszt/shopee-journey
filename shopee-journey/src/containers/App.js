import "./App.css";
import Header from "../components/Header";
import Quests from "../components/Quests";
import Profiledisplay from "../components/Profiledisplay";
import HomePage from "./HomePage";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import loadDummyData from "../dummyLoader";
import React, { Component,useEffect } from 'react';
import { getLevelInfo, getProfileInfo, addScore} from "../api";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f44336",
    },
  },
});

class App extends Component {
  constructor(props){
    super(props);
    loadDummyData();
    this.state = {
      levels : getLevelInfo(),
      profile : getProfileInfo(),
      level : getProfileInfo()['level'],
      score : getProfileInfo()['score'],
      username: getProfileInfo()['name'],
      name: getProfileInfo()['username'],
      nextScore: getLevelInfo()[getProfileInfo()['level']]['score'],
    }
  }

  _getNextScore = () => {
    this.setState({nextScore: getLevelInfo()[getProfileInfo()['level']]['score']});
  }

  _onAddScore = (val) => {
    addScore(val);
    this._getNextScore();
    this.setState({score:getProfileInfo()['score']});
    this.setState({level:getProfileInfo()['level']});
    this.setState({profile:getProfileInfo()});
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <Profiledisplay 
            score = {this.state.score}
            level = {this.state.level}
            username = {this.state.username}
            name = {this.state.name}
            nextscore = {this.state.nextScore}
            onaddscore = {this._onAddScore.bind(this)}
          />
          <Quests />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;


