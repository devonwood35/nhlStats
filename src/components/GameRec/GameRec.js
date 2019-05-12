import React from 'reactn';
import { Link } from "react-router-dom";
import "./GameRec.css";
import apiCall from "../../util/api.js";

export default class GameRec extends React.PureComponent {
	state = {
		games: []
	}

	componentWillMount() {
		this.getGames(this.props.player);
	}

	getGames = id => {
		apiCall.getGameStats(id, "20182019").then(games => {
			let season = games.data.people[0].stats[0].splits;
			let five = [];
			for (let i = 0; i < 5; i++) {
				if (season[i]) {
					five.push(season[i]);
				}
			}
			this.setState({
				games: five
			})
		})
	}

	render() {
		return (
			<div className="recent-games">
				{this.state.games[0] ?
					<div>
						<h4>Last 5 Games</h4>
						<div className="recent-wrapper">
							<div className="row recent-header">
								<p className="col-md-2">Home</p>
								<p className="col-md-2">Away</p>
								<p className="col-md-1">W/L</p>
								{this.state.games[0].stat.evenSaves ?
									<div className="col-md-3 row">
										<p className="col-md-4">Shots</p>
										<p className="col-md-4">Saves</p>
										<p className="col-md-4">Sv%</p>
									</div>
								:
									<div className="col-md-3 row">
										<p className="col-md-4">Goals</p>
										<p className="col-md-4">Assists</p>
										<p className="col-md-4">Points</p>
									</div>
								}
								<p className="col-md-2">Date</p>
							</div>
							{this.state.games.map(game => (
								game ?
								<div key={game.date} className="row recent-data">
									<p className="col-md-2">{game.isHome ? game.team.name : game.opponent.name}</p>
									<p className="col-md-2">{game.isHome ? game.opponent.name : game.team.name}</p>
									<p className="col-md-1"><strong>{game.isWin ? "W" : "L"}</strong></p>
									{game.stat.evenSaves ?
										<div className="row col-md-3">
											<p className="col-md-4">{game.stat.shotsAgainst}</p>
											<p className="col-md-4">{game.stat.saves}</p>
											<p className="col-md-4">{game.stat.savePercentage}</p>
										</div>
									:
										<div className="row col-md-3">
											<p className="col-md-4">{game.stat.goals}</p>
											<p className="col-md-4">{game.stat.assists}</p>
											<p className="col-md-4">{game.stat.points}</p>
										</div>}
									<p className="col-md-2">{game.date}</p>
									<Link className="col-md-2" to={`/game/${game.game.gamePk}`}><button>GameCenter</button></Link>
								</div>
								: <div className="row">
									<p>No Games Found</p>
								  </div>
							))}
						</div>
					</div>
				: <div/>}
			</div>
		)
	}
}