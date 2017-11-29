import React, { Component } from 'react';
import queryString from 'query-string';
import logo from './logo.svg';
import './App.css';
import ScoreboardWeekNav from './ScoreboardWeekNav';
import Nav from './Nav';
import Loading from './Loading';

function Player (props) {
  var { player } = props;
  return (
    <div className='player-container'>
      <div className='player-box-position'>{player.lineupPosition}</div>
      <div className='player-box-name'><a href={'http://www.espn.com/nfl/player/_/id/' + player.playerId} target="_blank">{player.playerName}</a>, {player.nflTeamAbbrev} {player.playerPosition}</div>
      <div className='player-box-position'>{player.nflTeamOppAbbrev}</div>
      <div className='player-box-position'>{(player.projectedPoints || 0).toFixed(1)}</div>
      <div className='player-box-position'>{(player.realPoints || 0).toFixed(1)}</div>
    </div>
  )
}

// state yes
class TeamLineup extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      displayFullBox: false,
      displayQuickBox: false,
      players: null,
      scoringPeriodId: props.scoringPeriodId
    }
  }

  componentDidMount() {
    var teamId = this.props.team;
    var scoringPeriodId = this.props.scoringPeriodId;
    return fetch('/api/players', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'teamId': teamId,
        'scoringPeriodId': scoringPeriodId
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          players: responseJson,
          scoringPeriodId: scoringPeriodId
        });
      })
  }

  componentWillReceiveProps(nextProps) {
    var teamId = nextProps.team;
    var scoringPeriodId = nextProps.scoringPeriodId;
    return fetch('/api/players', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'teamId': teamId,
        'scoringPeriodId': scoringPeriodId
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          players: responseJson,
          scoringPeriodId: scoringPeriodId
        });
      })
  }

  render() {
    return (
      <div className='matchup-details-stats'>
        {this.state.players &&
          <ul>
            <li>Line:</li>
            <li>Top Scorer: {this.state.players[0].playerName} - {this.state.players[0].realPoints} </li>
            <li>Best Lineup Total: </li>
            <li>Shoulda Started Em: {this.state.players[12].playerName} - {this.state.players[12].realPoints} </li>
          </ul>
        }
        <div>
          <div className='player-table'>
            <div className='player-container'>
              <div className='player-list-header'>Slot</div>
              <div className='player-list-header-name'>Player</div>
              <div className='player-list-header'>Opponent</div>
              <div className='player-list-header'>Proj. Pts</div>
              <div className='player-list-header'>Actual Pts</div>
            </div>
            {this.state.players && this.state.players.map(function (player) {
                  return (
                    <Player
                      player={player}
                      key={player.playerId} 
                    />
                  );
                })
            }
            <div className='player-container'>
              <div className='player-list-header'>STARTER</div>
              <div className='player-list-header-name'>TOTALS</div>
              <div className='player-list-header'></div>
              <div className='player-list-header'>Projected Points</div>
              <div className='player-list-header'>Actual Points</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// no state
function MatchupEntry (props) {
  var { matchup, scoringPeriodId } = props;
  return (
    <div>
      <div className='matchup-container'>
        <div className='matchup-team'>
          <div className='matchup-team-box-name'>{matchup.teams[0].team.teamLocation + ' ' + matchup.teams[0].team.teamNickname} ({matchup.teams[0].team.teamAbbrev})</div>
          <div className='matchup-team-box'>({matchup.teams[0].team.record.overallWins} - {matchup.teams[0].team.record.overallLosses})</div>
          <div className='matchup-team-box'>{matchup.teams[0].score.toFixed(1)}</div>
        </div>
        <div className='matchup-team'>
          <div className='matchup-team-box-name'>{matchup.teams[1].team.teamLocation + ' ' + matchup.teams[1].team.teamNickname} ({matchup.teams[1].team.teamAbbrev})</div>
          <div className='matchup-team-box'>({matchup.teams[1].team.record.overallWins} - {matchup.teams[1].team.record.overallLosses})</div>
          <div className='matchup-team-box'>{matchup.teams[1].score.toFixed(1)}</div>
        </div>
      </div>
      <div className='matchup-details-container'>
        <div className='matchup-details'>
          <div className='matchup-details-team'>
            {matchup.teams[0].team.teamAbbrev}
          </div>
          <div className='matchup-details-team'>
            {matchup.teams[1].team.teamAbbrev}
          </div>
        </div>
      </div>
      <div className='matchup-details-container'>
        <div className='matchup-details'>
          <TeamLineup
            team={matchup.teams[0].teamId}
            teamName={matchup.teams[0].team.teamLocation + ' ' + matchup.teams[0].team.teamNickname}
            teamAbbrev={matchup.teams[0].team.teamAbbrev}
            scoringPeriodId={scoringPeriodId}
          />
        </div>
        <div className='matchup-details'>
          <TeamLineup
            team={matchup.teams[1].teamId}
            teamName={matchup.teams[1].team.teamLocation + ' ' + matchup.teams[1].team.teamNickname}
            teamAbbrev={matchup.teams[1].team.teamAbbrev}
            scoringPeriodId={scoringPeriodId}
          />
        </div>
      </div>
    </div>
  )
}

class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchups: null,
      scoringPeriodId: null
    }
  }

  componentDidMount() {
    var params = queryString.parse(this.props.location.search);
    return fetch('/api/scoreboard', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'scoringPeriodId': params.scoringPeriodId.toString()
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          matchups: responseJson,
          scoringPeriodId: params.scoringPeriodId
        });
      })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      matchups: null
    });
    var params = queryString.parse(nextProps.location.search);
    console.log(params);
    return fetch('/api/scoreboard', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'scoringPeriodId': params.scoringPeriodId.toString()
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
          matchups: responseJson,
          scoringPeriodId: params.scoringPeriodId
      });
    })
  }
// pass matchups and scoring period ID down and just show quick high-level thing of each game
  render() {
    var params = queryString.parse(this.props.location.search);
    var scoringPeriodId = params.scoringPeriodId;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hamden Football</h1>
        </header>
        <Nav />
        <ScoreboardWeekNav />
          <div className='matchups-table'>
            {!this.state.matchups
              ? <Loading />
              : this.state.matchups.map(function (matchup) {
                  return (
                    <MatchupEntry
                      matchup={matchup}
                      key={matchup.teams[0].teamId}
                      scoringPeriodId={scoringPeriodId}
                    />
                  );
            })}
          </div>
      </div>
    );
  }
}

export default Scoreboard;