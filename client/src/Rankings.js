import React, { Component } from 'react';
import queryString from 'query-string';
import logo from './logo.svg';
import './App.css';
import RankingsWeekNav from './RankingsWeekNav';
import Nav from './Nav';
import Loading from './Loading';

function RankingEntry (props) {
  var { ranking, rank, l3games } = props;
  var l3Wins = l3games[0].wins + l3games[1].wins + l3games[2].wins;
  var l3Losses = l3games[0].losses + l3games[1].losses + l3games[2].losses;
  var l3Pfpg = ((l3games[0].score + l3games[1].score + l3games[2].score)/3).toFixed(1);
  var weeklyWinData = ranking.weeklyWinData;
  var l3GameData = ranking.l3GameData;
  var winCount = 0;
  var lossCount = 0;
  var winCountL3 = 0;
  var lossCountL3 = 0;
  weeklyWinData.forEach(function (object) {
    object.winner === true ? winCount++ : lossCount++;
  });
  l3GameData.forEach(function (object) {
    object.winner === true ? winCountL3++ : lossCountL3++;
  });
  var actualWins = winCount;
  var actualLosses = lossCount;
  var l3ActualWins = winCountL3;
  var l3ActualLosses = lossCountL3;
  var trend = ranking.lastRank - rank;
  var rpi = parseFloat(ranking.rpi * 100).toFixed(1) + '%';
  console.log(trend);
  return (
    <div className='rankings-container'>
      <div className='rankings-box-name'>{ranking.name}</div>
      <div className='standings-box-rank'>{rank}</div>
      <div className='standings-box'>{ranking.lastRank}</div>
      <div className='standings-box'>{trend === 0 ? <span>-</span> : (trend > 0 ? <span className="green-text"><i className="fa fa-arrow-up" aria-hidden="true"></i> {Math.abs(trend)}</span> : <span className="red-text"><i className="fa fa-arrow-down" aria-hidden="true"></i> {Math.abs(trend)}</span>)}</div>
      <div className='standings-box'>{ranking.wins}-{ranking.losses}</div>
      <div className='standings-box'>{l3Wins}-{l3Losses}</div>
      <div className='standings-box'>{actualWins}-{actualLosses}</div>
      <div className='standings-box'>{l3ActualWins}-{l3ActualLosses}</div>
      <div className='standings-box'>{l3Pfpg}</div>
      <div className='standings-box'>{rpi}</div>
    </div>
  )
}

function RankingsList (props) {
  var { rankings } = props;
  return (
    <div className='standings-table'>
      <div className='standings-container'>
        <div className='rankings-header-name'>Team Name</div>
        <div className='standings-header-rank'>Rank</div>
        <div className='rankings-list-header'>Last Week</div>
        <div className='rankings-list-header'>Trend</div>
        <div className='rankings-list-header'>Total W-L</div>
        <div className='rankings-list-header'>L3 Total W-L</div>
        <div className='rankings-list-header'>Real W-L</div>
        <div className='rankings-list-header'>L3 Real W-L</div>
        <div className='rankings-list-header'>L3 PFPG</div>
        <div className='rankings-list-header'>RPI</div>
      </div>
      {props.rankings.map(function (ranking, index) {
        return (
          <RankingEntry
            ranking={ranking}
            key={index} 
            rank={index + 1}
            // l3wins={ranking.weeklyWinData3[0].wins + ranking.weeklyWinData3[1].wins + ranking.weeklyWinData3[2].wins}
            // l3losses={ranking.weeklyWinData3[0].losses + ranking.weeklyWinData3[1].losses + ranking.weeklyWinData3[2].losses}
            // l3pfpg={((ranking.weeklyWinData3[0].score + ranking.weeklyWinData3[1].score + ranking.weeklyWinData3[2].score)/3).toFixed(2)}
            l3games={ranking.l3GameData}
          />
        );
      })}
    </div>
  )

}

class Rankings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankings: null,
      scoringPeriodId: null
    }
  }

  componentDidMount() {
    var params = queryString.parse(this.props.location.search);
    return fetch('/api/rankings', {
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
            rankings: responseJson,
            scoringPeriodId: params.scoringPeriodId
        });
      })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rankings: null
    });
    var params = queryString.parse(nextProps.location.search);
    return fetch('/api/rankings', {
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
          rankings: responseJson,
          scoringPeriodId: params.scoringPeriodId
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
        <RankingsWeekNav />
        <div>
          {!this.state.rankings
            ? <Loading />
            : <RankingsList
                rankings={this.state.rankings}
                />}
        </div>
      </div>
    );
  }
}

export default Rankings;