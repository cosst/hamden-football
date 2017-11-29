const express = require('express');
const espnFF = require('./espn-ff-api');

const cookies = {
  espnS2 : 'AEA%2B9ScV958bWkn1PE8qmws%2BKWNggMhvoVvA%2BcMfd3BmPJGpgAFid6t13A2yas%2B3NUCYO55dezS0PESWsS44ePTpJwsprKGLPfI4cNEVDk4IJZg6YlLxy9saiS2BTVE03G3hUtW6FUpQp0WNQMDKdhQYaMDNbkFo2wvkytaMTHL%2B6h0x%2Bi4PblaAKdv7YTILS%2FYYvvjps8I5kEoNbGfEk1WdhZs4V%2FdP1XM0U07DQkeZCMmN5E37HojVy%2B9HcAizphgF4ouX8fzssNirRpocxbmZce%2FxsyDMs9aRHz09KJyM8w%3D%3D',
  SWID   : '{9CDC632F-486E-4CA8-A258-FB53A8A81BC9}'
};

module.exports = {

  getStandings: function (req, res) {
    espnFF.getOverallStandings(cookies, '823037')
    .then(standings => res.send(standings))
    .catch(e => console.log(e));
  },

  getPowerRankings: function (req, res) {
    var leagueId = '823037';
    var seasonId = '2017';
    var scoringPeriodId = req.headers.scoringperiodid;
    espnFF.getPowerRankings(leagueId, seasonId, scoringPeriodId)
    .then(rankings => res.send(rankings))
    .catch(e => console.log(e));
  },

  getScoreboard: function (req, res) {
    var scoringPeriodId = req.headers.scoringperiodid;
    espnFF.getMatchups(cookies, '823037', scoringPeriodId)
    .then(leagueMatchups => res.send(leagueMatchups))
    .catch(e => console.log(e));
  },

  getPlayers: function (req, res) {
    var teamId = req.headers.teamid;
    var scoringPeriodId = req.headers.scoringperiodid;
    espnFF.getSingleTeamPlayers(cookies, '823037', teamId, scoringPeriodId)
    .then(players => res.send(players))
    .catch(e => console.log(e));
  },

  getWeeklyScoreDataForSeason: function (req, res) {
    espnFF.getWeeklyScoreDataForSeason('823037', '2017')
    .then(seasonData => res.send(seasonData))
    .catch(e => console.log(e));
  }
}
