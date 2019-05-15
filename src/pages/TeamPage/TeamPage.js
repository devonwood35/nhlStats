import React, { setGlobal } from "reactn";
import { Link } from "react-router-dom";
import GameRecTeam from "../../components/GameRecTeam/GameRecTeam";
import "./TeamPage.css";
import apiCall from "../../util/api.js";

export default class TeamPage extends React.PureComponent {
	state = {
		team: [],
		logo: "",
		games: []
	}
	componentWillMount() {
		this.callTeam(this.props.match.params.teamid);
	}

	componentDidUpdate(prevProps) {
	    if (prevProps.match.params.teamid !== this.props.match.params.teamid) {
	    	this.callTeam(this.props.match.params.teamid);
	    }
	}

	callTeam = id => {
		// Gets current team logo
		for (let i = 0; i < this.global.teamLogos.teams.length; i++) {
			if (this.global.teamLogos.teams[i].id == id) {
				this.setState({
					logo: this.global.teamLogos.teams[i].url
				})
			}
		}
		// Generates start and end date for api call
		let start = new Date();
		let day = String(start.getDate()).padStart(2, '0');
		let month = String(start.getMonth() + 1).padStart(2, '0');
		let year = start.getFullYear();

		start = `${year-1}-${month}-${day}`;
		let end = `${year}-${month}-${day}`;
		// Gets last 5 games for the team
		apiCall.getTeamGames(id, start, end).then(games => {
			let lastFive = [];
			for (let i = games.data.dates.length-5; i < games.data.dates.length; i++) {
				lastFive.push(games.data.dates[i]);
			}
			console.log(lastFive);
			this.setState({
				games: lastFive
			})
		})
		// Gets team's stats
		apiCall.getTeamStats(id).then(team => {
			console.log(team.data.teams[0])
			this.setState({
				team: team.data.teams[0].teamStats[0].splits[0]
			})
		})
		// Gets team's general info
		apiCall.getTeam(id).then(team => {
			setGlobal({
				teamInfo: team.data.teams[0],
				sideBar: id
			})
		})
	}

	render() {
		return (
			<div className="team-page row">
				{this.global.teamInfo.conference ? (
				<div className="row team-jumbo row-fix">	
					<div className="col-md-4">
						<img className="team-logo" width="90%" src={this.state.logo} alt="team"/>
					</div>
					<div className="col-md-8 row">
						<h1 className="col-md-12">{this.global.teamInfo.name}</h1>
						<div className="col-md-6 info-box">
							<h5>{this.global.teamInfo.conference.name} Conference</h5>
						</div>
						<div className="col-md-6 info-box">
							<h5>{this.global.teamInfo.division.name} Division</h5>
						</div>
						<div className="col-md-4 info-box">
							<p>{this.global.teamInfo.venue.name}</p>
						</div>
						<div className="col-md-4 info-box">
							<p>{this.global.teamInfo.venue.city}</p>
						</div>
						<div className="col-md-4 info-box">
							<p>Since {this.global.teamInfo.firstYearOfPlay}</p>
						</div>
					</div>
				</div>)
				: (<div/>)}
				<br/>
				{this.state.team.stat ?
					<div className="row row-fix">
						<div className="col-md-2 info-box">
							<p>GP: {this.state.team.stat.gamesPlayed}</p>
						</div>
						<div className="col-md-2 info-box">
							<p>Wins: {this.state.team.stat.wins}</p>
						</div>
						<div className="col-md-2 info-box">
							<p>Losses: {this.state.team.stat.losses}</p>
						</div>
						<div className="col-md-2 info-box">
							<p>OT: {this.state.team.stat.ot}</p>
						</div>
						<div className="col-md-2 info-box">
							<p>Points: {this.state.team.stat.pts}</p>
						</div>
						<div className="col-md-2 info-box">
							<p>GAA: {this.state.team.stat.goalsAgainstPerGame.toFixed(2)}</p>
						</div>
						<div className="col-md-2 info-box">
							<p>SA: {Math.round(this.state.team.stat.shotsAllowed)}</p>
						</div>
						<div className="col-md-2 info-box">
							<p>SPG: {Math.round(this.state.team.stat.shotsPerGame)}</p>
						</div>
						<div className="col-md-2 info-box">
							<p>Shot%: {this.state.team.stat.shootingPctg}</p>
						</div>
						<div className="col-md-2 info-box">
							<p>PP%: {this.state.team.stat.powerPlayPercentage}</p>
						</div>
						<div className="col-md-2 info-box">
							<p>PK%: {this.state.team.stat.penaltyKillPercentage}</p>
						</div>
						<div className="col-md-2 info-box">
							<p>FO%: {this.state.team.stat.faceOffWinPercentage}</p>
						</div>
						<div className="col-md-12">
							<Link to={`/team/${this.props.match.params.teamid}/roster`}><h3>Roster</h3></Link>
						</div>
						<div className="col-md-12 info-box">
							<a href={this.global.teamInfo.officialSiteUrl}>Official Team Site</a>
						</div>
						<div>
							<GameRecTeam games={this.state.games}/>
						</div>
					</div>
				:
				<div/>}
			</div>
		)
	}
}