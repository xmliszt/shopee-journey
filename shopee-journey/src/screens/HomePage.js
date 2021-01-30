import Header from '../components/Header';
import Quests from '../components/Quests';
import Profiledisplay from '../components/Profiledisplay';
import React, { Component } from 'react';
import { getLevelInfo, getProfileInfo, addScore } from '../api';
import loadDummyData from '../dummyLoader';

class HomePage extends Component {
  constructor(props) {
    super(props);
    loadDummyData();
    this.state = {
      levels: getLevelInfo(),
      profile: getProfileInfo(),
      level: getProfileInfo()['level'],
      score: getProfileInfo()['score'],
      username: getProfileInfo()['name'],
      name: getProfileInfo()['username'],
      nextScore: getLevelInfo()[getProfileInfo()['level']]['score'],
    };
  }

  _getNextScore = () => {
    this.setState({
      nextScore: getLevelInfo()[getProfileInfo()['level']]['score'],
    });
  };

  _onAddScore = (val) => {
    addScore(val);
    this._getNextScore();
    this.setState({ score: getProfileInfo()['score'] });
    this.setState({ level: getProfileInfo()['level'] });
    this.setState({ profile: getProfileInfo() });
  };

  render() {
    return (
      <div className='Home'>
        <Header title='Shopee Journey - Home' />
        <div style={{ height: 80 }}></div>
        <Profiledisplay
          score={this.state.score}
          level={this.state.level}
          username={this.state.username}
          name={this.state.name}
          nextscore={this.state.nextScore}
          onaddscore={this._onAddScore.bind(this)}
        />
        <Quests onaddscore={this._onAddScore.bind(this)} />
      </div>
    );
  }
}

export default HomePage;
