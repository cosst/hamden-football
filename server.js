const express = require('express');
const app = express();
const espnFF = require('./espn-ff-api');

var espn = require('./espn');

// serve the React app build files in production
app.use(express.static(`${__dirname}/client/build`));

// ESPN calls
app.get('/api/standings', espn.getStandings);
app.post('/api/rankings', espn.getPowerRankings);
app.post('/api/scoreboard', espn.getScoreboard);
app.post('/api/players', espn.getPlayers);

const port = process.env.PORT || 3002;
app.listen(port, function () {
  console.log('Server listening on port ' + port)
})

// espnFF.getWeeklyScoreDataForSeason('823037', '2017')
//   .then(seasonData => console.log(seasonData))
//   .catch(e => console.log(e));

// espnFF.getPowerRankings('823037', '2017', '11')
//   .then(rankings => console.log(rankings))
//   .catch(e => console.log(e));