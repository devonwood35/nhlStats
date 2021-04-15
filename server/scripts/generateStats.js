const ids = require('../playerIds');
const axios = require('axios');
const fs = require('fs');

/*

  File returns all players registered in the NHL for every season they played

  Parameters:

    None

  Returns:

    playerStats.json: List of all current players with stats in the NHL

*/

const finalStats = [];
const playerStats = async () => {
  for (const roster of ids.ids) {
    const response = await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${roster}?expand=person.stats&stats=yearByYear`);
    finalStats.push(response.data.people);
  }
}

playerStats().then((data) => {
  fs.writeFile('playerStats.json', JSON.stringify(finalStats), (err) => {
    if (err) throw err;
    return console.log('saved');
  });
});
