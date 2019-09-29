import axios from 'axios';
import {
  // LOAD_TEAM,
  LOAD_TEAMS,
  // LOAD_TEAMSTATS,
  // LOAD_ROSTER,
  // LOAD_PLAYER,
  // LOAD_PLAYERS,
  // LOAD_GAME,
  // LOAD_GAMES
} from '../utils/constants';

// function loadTeam(id) {
//   return async (dispatch) => {
//     const response = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${id}`);

//     dispatch({
//       type: LOAD_TEAM,
//       payload: response.data.teams
//     });
//   };
// }

function loadTeams() {
  return async (dispatch) => {
    const response = await axios.get('https://statsapi.web.nhl.com/api/v1/teams');

    dispatch({
      type: LOAD_TEAMS,
      payload: response.data.teams
    });
  };
}

// function loadTeamStats(id) {
//   return async (dispatch) => {
//     const response = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${id}/?expand=team.stats&season=20182019`);

//     dispatch({
//       type: LOAD_TEAMSTATS,
//       payload: response.data.teams[0].teamStats[0].splits
//     });
//   };
// }

// function loadRoster(id) {
//   return async (dispatch) => {
//     const response = await axios.get('/api/depositions');

//     dispatch({
//       type: LOAD_DEPOSITIONS,
//       payload: response.data.depositions
//     });
//   };
// }

// function loadPlayer(id) {
//   return async (dispatch) => {
//     const response = await axios.get('/api/depositions');

//     dispatch({
//       type: LOAD_DEPOSITIONS,
//       payload: response.data.depositions
//     });
//   };
// }

// function loadPlayers(id) {
//   return async (dispatch) => {
//     const response = await axios.get('/api/depositions');

//     dispatch({
//       type: LOAD_DEPOSITIONS,
//       payload: response.data.depositions
//     });
//   };
// }

// function loadGame(id) {
//   return async (dispatch) => {
//     const response = await axios.get('/api/depositions');

//     dispatch({
//       type: LOAD_DEPOSITIONS,
//       payload: response.data.depositions
//     });
//   };
// }

// function loadGames(id) {
//   return async (dispatch) => {
//     const response = await axios.get('/api/depositions');

//     dispatch({
//       type: LOAD_GAMES,
//       payload: response.data.teams
//     });
//   };
// }

export { loadTeams }; // eslint-disable-line
