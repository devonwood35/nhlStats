import axios from 'axios';

export default {
  loadTeam(id) {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${id}`);
  },
  loadTeamStats(id) {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${id}/?expand=team.stats&season=20182019`);
  },
  loadRoster(id) {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${id}/roster`);
  },
  loadPlayer(id) {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/people/${id}?expand=person.stats&stats=yearByYear`);
  },
  loadGameStats(id, date) {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/people/${id}?expand=person.stats&stats=gameLog&season=${date}`);
  },
  loadGame(id) {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/game/${id}/feed/live`);
  },
  loadGames(id, start, end) {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/schedule?teamId=${id}&startDate=${start}&endDate=${end}`);
  }
};
