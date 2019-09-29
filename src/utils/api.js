import axios from 'axios';

export default {
  loadTeam(id) {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${id}`);
  },
  loadTeamStats(id) {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${id}/?expand=team.stats&season=20182019`);
  },
  loadGame(id) {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/game/${id}/feed/live`);
  },
  loadGames(id, start, end) {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/schedule?teamId=${id}&startDate=${start}&endDate=${end}`);
  }
};
