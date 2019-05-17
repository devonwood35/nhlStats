import React from 'reactn';
import { Link } from 'react-router-dom';
import apiCall from "../../util/api.js";
import "./GameRecTeam.css";

export default class GameRecTeam extends React.PureComponent {
	state = {
		winLoss: []
	}

	componentDidUpdate(prevProps) {
	    if (prevProps.games !== this.props.games) {
	    	this.callGame(this.props.games);
	    }
	}

	callGame = games => {
		let winLossPush = [];
		let logosPush = [];
		for (let i = 0; i < games.length; i++) {
			if (games[i].games[0].teams.home.team.id == this.props.team) {
				if (games[i].games[0].teams.home.score > games[i].games[0].teams.away.score) {
					winLossPush.push({
						final: "W",
						team: games[i].games[0].teams.home.team.id
					});
				} else {
					winLossPush.push({
						final: "L",
						team: games[i].games[0].teams.away.team.id
					})
				}
			} else if (games[i].games[0].teams.away.team.id == this.props.team) {
				if (games[i].games[0].teams.away.score > games[i].games[0].teams.home.score) {
					winLossPush.push({
						final: "W",
						team: games[i].games[0].teams.away.team.id
					})
				} else {
					winLossPush.push({
						final: "L",
						team: games[i].games[0].teams.home.team.id
					})
				}
			}
		}
		this.setState({
			winLoss: winLossPush
		})
	}

	componentWillMount() {
		this.callGame(this.props.games)
	}

	render() {
		console.log(this.props.games)
		return (
			<div className="recent-games-team">
				{this.props.games.filter(gameState => gameState.games[0].status.abstractGameState == "Live").map((game, index) => (
					<div key={game.date} style={{"marginTop": "3%", "marginBottom": "3%"}}>
						<h2 style={{"color": "red"}}>* LIVE *</h2>	
						<div className="recent-wrapper">
							<div className="row recent-header">
								<p className="col-md-3">Home</p>
								<p className="col-md-3">Away</p>
								<p className="col-md-2">W/L</p>
								<p className="col-md-2">Date</p>
								<p className="col-md-2">Link</p>
							</div>
							<div className="row row-fix team-recent-games" key={game.date}>
								<p className="col-md-2" style={{"margin": "auto"}}>{game.games[0].teams.home.team.name}</p>
								<h5 className="col-md-1" style={{"margin": "auto"}}>{game.games[0].teams.home.score}</h5>
								<p className="col-md-2" style={{"margin": "auto"}}>{game.games[0].teams.away.team.name}</p>
								<h5 className="col-md-1" style={{"margin": "auto"}}>{game.games[0].teams.away.score}</h5>
								<h5 className="col-md-2" style={{"margin": "auto"}}>{this.state.winLoss[index] ? this.state.winLoss[index].final : ""}</h5>
								<p className="col-md-2" style={{"margin": "auto"}}>{game.date}</p>
								<Link className="col-md-2" style={{"margin": "auto"}} to={`/game/${game.games[0].gamePk}`}><button>GameCenter</button></Link>
							</div>
						</div>
					</div>
				))}
				<h4>Last 5 Games</h4>
				<div className="recent-wrapper">
					<div className="row recent-header">
						<p className="col-md-3">Home</p>
						<p className="col-md-3">Away</p>
						<p className="col-md-2">W/L</p>
						<p className="col-md-2">Date</p>
						<p className="col-md-2">Link</p>
					</div>
				{this.props.games.filter(gameState => gameState.games[0].status.abstractGameState == "Final").map((game, index) => (
					<div className="row row-fix team-recent-games" key={game.date}>
						<p className="col-md-2" style={{"margin": "auto"}}>{game.games[0].teams.home.team.name}</p>
						<h5 className="col-md-1" style={{"margin": "auto"}}>{game.games[0].teams.home.score}</h5>
						<p className="col-md-2" style={{"margin": "auto"}}>{game.games[0].teams.away.team.name}</p>
						<h5 className="col-md-1" style={{"margin": "auto"}}>{game.games[0].teams.away.score}</h5>
						<h5 className="col-md-2" style={{"margin": "auto"}}>{this.state.winLoss[index] ? this.state.winLoss[index].final : ""}</h5>
						<p className="col-md-2" style={{"margin": "auto"}}>{game.date}</p>
						<Link className="col-md-2" style={{"margin": "auto"}} to={`/game/${game.games[0].gamePk}`}><button>GameCenter</button></Link>
					</div>
				)).reverse()}
				</div>
			</div>
		)
	}
	
}