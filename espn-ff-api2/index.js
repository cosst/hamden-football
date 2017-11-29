const scoreboard = require('./scoreboard');
const standings  = require('./standings');
const rosters    = require('./rosters');
const boxscores  = require('./boxscores');
const rankings   = require('./rankings');

module.exports = {
  getLeagueScoreboard           : scoreboard.getLeagueScoreboard,
  getMatchups                   : scoreboard.getMatchups,
  getSpecificMatchup            : scoreboard.getSpecificMatchup,
  getLeagueStandings            : standings.getLeagueStandings,
  getOverallStandings           : standings.getOverallStandings,
  getRosters                    : rosters.getRosters,
  getBoxScore                   : boxscores.getBoxScore,
  getLineups                    : boxscores.getLineups,
  getMatchupLineups             : boxscores.getMatchupLineups,
  getSingleTeamLineup           : boxscores.getSingleTeamLineup,
  getSingleTeamPlayers          : boxscores.getSingleTeamPlayers,
  getPowerRankings              : rankings.getPowerRankings,
  getUserData                   : rankings.getUserData,
  getWeeklyWinsForSeason        : rankings.getWeeklyWinsForSeason,
  getLeagueData                 : rankings.getLeagueData,
  calculateSeasonWinTotal       : rankings.calculateSeasonWinTotal,
  calculateWeeklyWinsForSeason  : rankings.calculateWeeklyWinsForSeason,
  getWeeklyScoreDataForSeason   : rankings.getWeeklyScoreDataForSeason,
  getWeekScores                 : rankings.getWeekScores,
  getWeeklyWinsForSeason2       : rankings.getWeeklyWinsForSeason2,
  calculateWeeklyWinsForSeason2 : rankings.calculateWeeklyWinsForSeason2,
  getWeeklyScoreDataForSeason2  : rankings.getWeeklyScoreDataForSeason2,
}
