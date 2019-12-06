const fs = require('fs');
const allPlayers = require('./playerStats.json');

const skaters = [];
const goalies = [];

allPlayers.forEach((team) => {
  team.forEach((player) => {
    if (player.primaryPosition.code == 'G') {
      goalies.push(player);
    } else {
      skaters.push(player);
    }
  });
});

skaters.forEach((player) => {
  if (player.stats[0].splits[player.stats[0].splits.length - 1].season == '20192020') {
    player.stats[0].splits = player.stats[0].splits[player.stats[0].splits.length - 1];
  }
});

goalies.forEach((player) => {
  if (player.stats[0].splits[player.stats[0].splits.length - 1].season == '20192020') {
    player.stats[0].splits = player.stats[0].splits[player.stats[0].splits.length - 1];
  }
});

module.exports = {
  skaters: skaters,
  goalies: goalies
};
