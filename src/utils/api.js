import axios from 'axios';

export default {
  loadTeam: function(id) {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${id}`);
  },
  loadTeamStats: function(id) {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${id}/?expand=team.stats&season=20182019`);
  },
  loadGames: function(id, start, end) {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/schedule?teamId=${id}&startDate=${start}&endDate=${end}`);
  }
}
