import React from 'reactn';
import "./GamePage.css";
import apiCall from "../../util/api.js";
import GameJumbo from "../../components/GameJumbo/GameJumbo.js";

export default class GamePage extends React.PureComponent {
	state = {
		game: {},
		homeAway: {}
	}

	getGame = id => {
		apiCall.getGame(id).then(game => {
			console.log(game.data);
			let visit = {};
			for (let i = 0; i < this.global.teamLogos.teams.length; i++) {
				if (this.global.teamLogos.teams[i].id === game.data.gameData.teams.home.id) {
					visit.home = this.global.teamLogos.teams[i];
				} else if (this.global.teamLogos.teams[i].id === game.data.gameData.teams.away.id) {
					visit.away = this.global.teamLogos.teams[i];
				}
			}
			this.setState({
				game: game.data,
				homeAway: visit
			})
		})
	}

	componentWillMount() {
		this.getGame(this.props.match.params.gameid);
		console.log(this.global.teamLogos);
	}

	render() {
		return (
			<div className="game-wrapper">
				{this.state.game.gameData ? <GameJumbo homeAway={this.state.homeAway} game={this.state.game}/> : <div/>}
			</div>
		)
	}
}