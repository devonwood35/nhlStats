const express = require('express');
const request = require('request');
const axios = require('axios');
const teams = require('./data/teams');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/get/players/:id', (req, res) => {
  const players = [];
  const finalStats = [];

  const findAllPlayers = async () => {
    for (const roster of teams.logos) {
      const response = await axios.get(`https://records.nhl.com/site/api/player/byTeam/${roster.id}`);
      players.push(response.data.data);
    }
  }

  const playerStats = async (allPlayers) => {
    // for (const roster of allPlayers) {
    //   const response = await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${roster}?expand=person.stats&stats=yearByYear`);
    //   finalStats.push(response.data);
    // }
    const response = await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${allPlayers[0]}?expand=person.stats&stats=yearByYear`);
    finalStats.push(response.data.people)
  }
  findAllPlayers().then(() => {
    const playerIds = [];
    players.forEach((team) => {
      team.forEach((play) => {
        if (play.onRoster == 'Y') {
          playerIds.push(play.id);
        }
      });
    })
    // playerStats(playerIds).then(() => {
    //   console.log(finalStats[0])
    //   res.json(finalStats);
    // })

    res.json(playerIds);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
