const espnRequest = require('./espn-request');
const axios = require('axios');
const { values, cloneDeep, takeRight } = require('lodash');

async function getPowerRankings (leagueId, seasonId, scoringPeriodId) {
  const userData = await this.getUserData(leagueId, seasonId);
  let weeklyWins = await this.getWeeklyWinsForSeason(leagueId, seasonId, scoringPeriodId)
  let l3Games = await this.getWeeklyWinsForSeason2(leagueId, seasonId, scoringPeriodId)
  let rankings = this.calculateSeasonWinTotal(cloneDeep(weeklyWins));
  console.log(rankings);
  rankings = rankings.map(team => ({
      ...userData.find(user => user.id === team.id),
      ...team,
      weeklyWinData: [],
      l3GameData: []
  }));
  weeklyWins = weeklyWins.filter(week => week.length);
  weeklyWins.forEach(week => {
      rankings = rankings.map(team => {
          const winData = week.find(user => user.id === team.id);
          return {
              weeklyWinData : winData && winData.wins + winData.losses > 0 ? team.weeklyWinData.push(winData): team.weeklyWinData,
              ...team
          }
      })
  });
  l3Games = l3Games.filter(week => week.length);
  l3Games.forEach(week => {
      rankings = rankings.map(team => {
          const winData3 = week.find(user => user.id === team.id);
          return {
              l3GameData : winData3 && winData3.wins + winData3.losses > 0
                ? team.l3GameData.push(winData3)
                : team.l3GameData, ...team
          }
      })
  });
  return rankings;
}

async function getWeeklyWinsForSeason (leagueId, seasonId, scoringPeriodId) {
  const weeklyScoreDataForSeason = await this.getWeeklyScoreDataForSeason(leagueId, seasonId, scoringPeriodId);
  return this.calculateWeeklyWinsForSeason(weeklyScoreDataForSeason);
}

async function getWeeklyWinsForSeason2 (leagueId, seasonId, scoringPeriodId) {
  const weeklyScoreDataForSeason2 = await this.getWeeklyScoreDataForSeason2(leagueId, seasonId, scoringPeriodId);
  return this.calculateWeeklyWinsForSeason(weeklyScoreDataForSeason2);
}

function calculateSeasonWinTotal (weeklyWinsForSeason) {
  let seasonTotal2 = [];
  let seasonTotal3 = [];

  var l3WeeklyWinsForSeason2 = [...weeklyWinsForSeason];
  var lastWeeklyWinsForSeason2 = [...weeklyWinsForSeason];
  var lastl3WeeklyWinsForSeason2 = [...weeklyWinsForSeason];
  var l3WeeklyWins = l3WeeklyWinsForSeason2.splice(-3, 3);
  var lastl3WeeklyWins = lastl3WeeklyWinsForSeason2.splice(-4, 3);
  lastWeeklyWinsForSeason2.pop();
  lastWeeklyWinsForSeason2.forEach(weekWins => {
      weekWins.forEach(team => {
          if(seasonTotal3.find(seasonTotal3Team => seasonTotal3Team.id === team.id)) {
              let element = seasonTotal3.find(seasonTotal3Team => seasonTotal3Team.id === team.id);
              seasonTotal3[seasonTotal3.indexOf(element)].lastWins += team.wins;
              seasonTotal3[seasonTotal3.indexOf(element)].lastLosses += team.losses;  
          } else {
              seasonTotal3.push(team)
          }
      })
  });

  weeklyWinsForSeason.forEach(weekWins => {
      weekWins.forEach(team => {
          if(seasonTotal2.find(seasonTotal2Team => seasonTotal2Team.id === team.id)) {
              let element = seasonTotal2.find(seasonTotal2Team => seasonTotal2Team.id === team.id);
              seasonTotal2[seasonTotal2.indexOf(element)].wins += team.wins;
              seasonTotal2[seasonTotal2.indexOf(element)].losses += team.losses;  
          } else {
              seasonTotal2.push(team)
          }
      })
  });

  for (var i = 0; i < seasonTotal2.length; i++) {
    seasonTotal2[i].last3Wins = 0;
    seasonTotal2[i].last3Losses = 0;
  }
  l3WeeklyWins.forEach(weekWins => {
      weekWins.forEach(team => {
          if(seasonTotal2.find(seasonTotal2Team => seasonTotal2Team.id === team.id)) {
              let element = seasonTotal2.find(seasonTotal2Team => seasonTotal2Team.id === team.id);
              seasonTotal2[seasonTotal2.indexOf(element)].last3Wins += team.wins;
              seasonTotal2[seasonTotal2.indexOf(element)].last3Losses += team.losses;  
          } else {
              seasonTotal2.push(team)
          }
      })
  });

  for (var i = 0; i < seasonTotal2.length; i++) {
    seasonTotal2[i].lastLast3Wins = 0;
    seasonTotal2[i].lastLast3Losses = 0;
  }
  lastl3WeeklyWins.forEach(weekWins => {
      weekWins.forEach(team => {
          if(seasonTotal2.find(seasonTotal2Team => seasonTotal2Team.id === team.id)) {
              let element = seasonTotal2.find(seasonTotal2Team => seasonTotal2Team.id === team.id);
              seasonTotal2[seasonTotal2.indexOf(element)].lastLast3Wins += team.wins;
              seasonTotal2[seasonTotal2.indexOf(element)].lastLast3Losses += team.losses;
              seasonTotal2[seasonTotal2.indexOf(element)].lastl3score += team.score;  
          } else {
              seasonTotal2.push(team)
          }
      })
  });

  l3WeeklyWins.forEach(weekWins => {
      weekWins.forEach(team => {
          if(seasonTotal2.find(seasonTotal2Team => seasonTotal2Team.id === team.id)) {
              let element = seasonTotal2.find(seasonTotal2Team => seasonTotal2Team.id === team.id);
              seasonTotal2[seasonTotal2.indexOf(element)].l3score += team.score;
          } else {
              seasonTotal2.push(team)
          }
      })
  });

  for (var i = 0; i < seasonTotal2.length; i++) {
    seasonTotal2[i].lastl3Pfpg = (seasonTotal2[i].lastl3score/3).toFixed(1);
  }
  var lastWeeks = weeklyWinsForSeason.length - 1;
  for (var i = 0; i < seasonTotal2.length; i++) {
    seasonTotal2[i].lastRawScore = ((seasonTotal2[i].lastWins * 1.1) + (seasonTotal2[i].lastLast3Wins / 3 * lastWeeks) + (seasonTotal2[i].lastl3Pfpg * 1.1)).toFixed(1);
  }
  for (var i = 0; i < seasonTotal2.length; i++) {
    seasonTotal2[i].l3Pfpg = (seasonTotal2[i].l3score/3).toFixed(1);
  }
  var weeks = weeklyWinsForSeason.length;
  for (var i = 0; i < seasonTotal2.length; i++) {
    seasonTotal2[i].rawScore = ((seasonTotal2[i].wins * 1.1) + (seasonTotal2[i].last3Wins / 3 * weeks) + (seasonTotal2[i].l3Pfpg * 1.1)).toFixed(1);
  }

  seasonTotal2.sort((a, b) => { 
      return b.lastRawScore - a.lastRawScore;
  });
  var lastRank = 0;
    for (var i = 0; i < seasonTotal2.length; i++) {
      lastRank++;
      seasonTotal2[i].lastRank = lastRank;
    }
  seasonTotal2.sort((a, b) => { 
      return b.rawScore - a.rawScore;
  });
  for (var i = 0; i < seasonTotal2.length; i++) {
    seasonTotal2[i].rpi = seasonTotal2[i].rawScore / seasonTotal2[0].rawScore;
  }
  console.log(seasonTotal2);
  return seasonTotal2;
}

function calculateWeeklyWinsForSeason (weeklyScoreDataForSeason) {
  return weeklyScoreDataForSeason
          .map(singleWeekScoreData => singleWeekScoreData
              .map((teamScoreData, index) => ({
                  wins: index,
                  losses: singleWeekScoreData.length - 1 - index,
                  lastWins: index,
                  lastLosses: singleWeekScoreData.length - 1 - index,
                  last3Wins: index,
                  last3Losses: singleWeekScoreData.length - 1 - index,
                  lastLast3Wins: index,
                  lastLast3Losses: singleWeekScoreData.length - 1 - index,
                  id: teamScoreData.id,
                  name: teamScoreData.name,
                  score: teamScoreData.score,
                  l3score: 0,
                  lastl3score: 0,
                  winner: teamScoreData.winner
              })))
}

function calculateWeeklyWinsForSeason2 (weeklyScoreDataForSeason2) {
  return weeklyScoreDataForSeason2
          .map(singleWeekScoreData2 => singleWeekScoreData2
              .map((teamScoreData2, index) => ({
                  l3Wins: index,
                  l3Losses: singleWeekScoreData2.length - 1 - index
              })))
}

async function getWeeklyScoreDataForSeason (leagueId, seasonId, scoringPeriodId) {
  let seasonData = [];
  var response = await axios.get(`https://games.espn.com/ffl/api/v2/leagueSettings?leagueId=${leagueId}&seasonId=${seasonId}`);
  const weeksInSeason = scoringPeriodId;
  for (let i = 1; i <= weeksInSeason; i++) {
      const weekScores = await this.getWeekScores(leagueId, seasonId, i)
      weekScores.sort((a, b) => { 
          return a.score - b.score;
      });
      seasonData.push(weekScores);
  }
  return seasonData;
}

async function getWeeklyScoreDataForSeason2 (leagueId, seasonId, scoringPeriodId) {
  let seasonData2 = [];
  var response = await axios.get(`https://games.espn.com/ffl/api/v2/leagueSettings?leagueId=${leagueId}&seasonId=${seasonId}`);
  for (let i = scoringPeriodId - 2; i <= scoringPeriodId; i++) {
      const weekScores2 = await this.getWeekScores(leagueId, seasonId, i)
      weekScores2.sort((a, b) => { 
          return a.score - b.score;
      });
      seasonData2.push(weekScores2);
  }
  return seasonData2;
}

async function getUserData (leagueId, seasonId) {
    var response = await axios.get(`https://games.espn.com/ffl/api/v2/leagueSettings?leagueId=${leagueId}&seasonId=${seasonId}`);
    return values(response.data.leaguesettings.teams).map(team => (
        {
            id: team.teamId,
            logoUrl: team.logoUrl ? team.logoUrl: "https://openclipart.org/image/2400px/svg_to_png/202776/pawn.png",
            owner: `${team.owners[0].firstName} ${team.owners[0].lastName}`,
            name: `${team.teamLocation} ${team.teamNickname}`,
            overallWins: team.record.overallWins,
            overallLosses: team.record.overallLosses,
            overallStanding: team.overallStanding
        }
    ))
}

async function getLeagueData (leagueId, seasonId) {
  var response = await axios.get(`https://games.espn.com/ffl/api/v2/leagueSettings?leagueId=${leagueId}&seasonId=${seasonId}`);
  return {
      name: response.data.leaguesettings.name
  }
}

async function getWeekScores (leagueId, seasonId, week) {
  var response = await axios.get(`https://games.espn.com/ffl/api/v2/scoreboard?leagueId=${leagueId}&seasonId=${seasonId}&matchupPeriodId=${week}`);
  let matchups = response.data.scoreboard.matchups;
  return matchups
      .filter(matchup => matchup.winner !== 'undecided' || matchup.bye )
      .map((matchup) => {
        return matchup.teams.map((team) => {
          if ( team.home && matchup.winner === 'home' ) {
            team['winner'] = true;
          } else if ( !team.home && matchup.winner === 'away' ) {
            team['winner'] = true;
          } else {
            team['winner'] = false; 
          }
          return team;
        })
      })
      .reduce((acc, matchup) => acc.concat(matchup), [])
      .map(team => ({
          id: team.teamId, 
          score: team.score,
          name: `${team.team.teamLocation} ${team.team.teamNickname}`,
          winner: team.winner
      }))
      .filter(team => team.score !== 0);
}

module.exports = {
  getPowerRankings              : getPowerRankings,
  getUserData                   : getUserData,
  getWeeklyWinsForSeason        : getWeeklyWinsForSeason,
  getWeeklyWinsForSeason2       : getWeeklyWinsForSeason2,
  getLeagueData                 : getLeagueData,
  calculateSeasonWinTotal       : calculateSeasonWinTotal,
  calculateWeeklyWinsForSeason  : calculateWeeklyWinsForSeason,
  calculateWeeklyWinsForSeason2 : calculateWeeklyWinsForSeason2,
  getWeeklyScoreDataForSeason   : getWeeklyScoreDataForSeason,
  getWeeklyScoreDataForSeason2  : getWeeklyScoreDataForSeason2,
  getWeekScores                 : getWeekScores
};
