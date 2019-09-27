import axios from 'axios';
import {
  // LOAD_TEAM,
  LOAD_TEAMS,
  // LOAD_TEAMSTATS,
  // LOAD_ROSTER,
  // LOAD_PLAYER,
  // LOAD_PLAYERS,
  // LOAD_GAME,
  // LOAD_SCHEDULE
} from '../utils/constants';

// function loadTeam(id) {
//   return async (dispatch) => {
//     const response = await axios.get('/api/depositions');

//     dispatch({
//       type: LOAD_DEPOSITIONS,
//       payload: response.data.depositions
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

// function loadTeamstats(id) {
//   return async (dispatch) => {
//     const response = await axios.get('/api/depositions');

//     dispatch({
//       type: LOAD_DEPOSITIONS,
//       payload: response.data.depositions
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

// function loadSchedule(id) {
//   return async (dispatch) => {
//     const response = await axios.get('/api/depositions');

//     dispatch({
//       type: LOAD_DEPOSITIONS,
//       payload: response.data.depositions
//     });
//   };
// }

export { loadTeams }; // eslint-disable-line
