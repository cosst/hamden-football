import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './Nav';

class StandingEntry extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      standing: props.standing
    }
  }

  render() {
    var streakWl = (this.state.standing.streakType === 1) ? 'W':'L';
    return (
      <div className='player-container'>
        <div className='standings-box-rank'>{this.state.standing.overallStanding}</div>
        <div className='standings-box-name'>{this.state.standing.teamLocation} {this.state.standing.teamNickname}</div>
        <div className='standings-box'>{this.state.standing.wins}</div>
        <div className='standings-box'>{this.state.standing.losses}</div>
        <div className='standings-box'>{(streakWl) + (this.state.standing.streakLength)}</div>
        <div className='standings-box'>{this.state.standing.pointsFor.toFixed(1)}</div>
        <div className='standings-box'>{this.state.standing.pointsAgainst.toFixed(1)}</div>
        <div className='standings-box'>{(this.state.standing.pointsFor/(this.state.standing.wins + this.state.standing.losses)).toFixed(1)}</div>
        <div className='standings-box'>{(this.state.standing.pointsAgainst/(this.state.standing.wins + this.state.standing.losses)).toFixed(1)}</div>
      </div>
    )
  }
}

class StandingsList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      standings: props.standings
    }
  }

  render() {
    return (
      <div className='standings-table'>
        <div className='standings-container'>
          <div className='standings-header-rank'>Rank</div>
          <div className='standings-header-name'>Team Name</div>
          <div className='rankings-list-header'>Wins</div>
          <div className='rankings-list-header'>Losses</div>
          <div className='rankings-list-header'>Streak</div>
          <div className='rankings-list-header'>PF</div>
          <div className='rankings-list-header'>PA</div>
          <div className='rankings-list-header'>PFPG</div>
          <div className='rankings-list-header'>PAPG</div>
        </div>
        {this.state.standings.map(function (standing) {
          return (
            <StandingEntry
              standing={standing}
              key={standing.teamId} 
            />
          );
        })}
      </div>
    )
  }
}

class Standings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      standings: null
    }
  }

  componentDidMount() {
    return fetch('/api/standings')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
            standings: responseJson
        });
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hamden Football</h1>
        </header>
        <Nav />
        <div>
          {!this.state.standings
            ? <p>Loading</p>
            : <StandingsList
                standings={this.state.standings}
                />}
        </div>
      </div>
    );
  }
}

export default Standings;
