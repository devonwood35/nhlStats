import axios from "axios";

export default {
	getTeams: function() {
		return axios.get(`https://statsapi.web.nhl.com/api/v1/teams`);
	},
	getTeam: function(id) {
		return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${id}`);
	},
	getRoster: function(id) {
		return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${id}/roster`);
	},
	getPlayer: function(id) {
		return axios.get(`https://statsapi.web.nhl.com/api/v1/people/${id}?expand=person.stats&stats=yearByYear`);
	},
	getGameStats: function(id, date) {
		return axios.get(`https://statsapi.web.nhl.com/api/v1/people/${id}?expand=person.stats&stats=gameLog&season=${date}`);
	},
	getGame: function(id) {
		return axios.get(`https://statsapi.web.nhl.com/api/v1/game/${id}/feed/live`);
	},
	getTeamStats: function(id) {
		return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${id}/?expand=team.stats&season=20182019`);
	},
	getTeamGames: function(id, start, end) {
		return axios.get(`https://statsapi.web.nhl.com/api/v1/schedule?teamId=${id}&startDate=${start}&endDate=${end}`)
	}
}