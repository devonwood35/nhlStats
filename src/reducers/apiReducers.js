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

const INITIAL_STATE = {
  teams: [],
};

function reducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case LOAD_TEAMS:
      return { teams: [...payload] };
    default:
      return state;
  }
}

export default reducer;
