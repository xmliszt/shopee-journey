import Header from '../components/Header';
import Quests from '../components/Quests';
import Profiledisplay from '../components/Profiledisplay';
import React, { Component } from 'react';
import {
  getLevelInfo,
  getProfileInfo,
  addScore,
  getUserInfo,
  setProfileInfo,
} from '../api';
import { getImageUrl } from 'libraries/utils/url';
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
      username: 'Loading',
      name: getProfileInfo()['name'],
      nextScore: getLevelInfo()[getProfileInfo()['level']]['score'],
      avatar: null,
    };
  }

  async componentDidMount() {
    let profile = await getUserInfo();

    if (profile['success']) {
      let data = profile['data'];
      this.setState({ username: data.user_name });
      this.setState({ avatar: data.avatar });
      let ourProfile = getProfileInfo();
      ourProfile.name = data.user_name;
      ourProfile.image = getImageUrl(data.avatar);
      setProfileInfo(ourProfile);
    } else {
      let data = profile['error_message'];
      this.setState({ username: data });
      this.setState({ avatar: false });
    }
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
          avatar={this.state.avatar}
        />
        <Quests onaddscore={this._onAddScore.bind(this)} />
      </div>
    );
  }
}

export default HomePage;
