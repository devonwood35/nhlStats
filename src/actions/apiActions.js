import axios from 'axios';
import {
  LOAD_TEAMS
} from '../utils/constants';

function loadTeams() {
  return async (dispatch) => {
    const allPlayers = await axios.get('/get/players/24');
    dispatch({
      type: LOAD_TEAMS,
      payload: allPlayers.data
    });
  };
}

export { loadTeams };
