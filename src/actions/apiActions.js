import axios from 'axios';
import {
  LOAD_TEAMS
} from '../utils/constants';

function loadTeams() {
  return async (dispatch) => {
    const response = await axios.get('https://statsapi.web.nhl.com/api/v1/teams');

    dispatch({
      type: LOAD_TEAMS,
      payload: response.data.teams
    });
  };
}

export default loadTeams;
