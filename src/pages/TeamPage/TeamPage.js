import React, { setGlobal } from "reactn";
import { Link } from "react-router-dom";
import GameRecTeam from "../../components/GameRecTeam/GameRecTeam";
import "./TeamPage.css";
import apiCall from "../../util/api.js";

export default class TeamPage extends React.PureComponent {
	state = {
		team: []
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
		apiCall.getTeamStats(id).then(team => {
			console.log(team.data.teams[0])
			this.setState({
				team: team.data.teams[0].teamStats[0].splits[0]
			})
		})
		apiCall.getTeam(id).then(team => {
			setGlobal({
				teamInfo: team.data.teams[0],
				sideBar: id
			})
		})
	}

	render() {
		console.log(this.global.teamInfo)
		return (
			<div className="team-page row">
				<div className="col-md-12">
					<h1 className="jumbotron">{this.global.teamInfo.name}</h1>
				</div>
				{this.global.teamInfo.conference ? (
				<div className="row row-fix">
					<div className="col-md-6 info-box">
						<p>{this.global.teamInfo.conference.name} Conference</p>
					</div>
					<div className="col-md-6 info-box">
						<p>{this.global.teamInfo.division.name} Division</p>
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
					<div className="col-md-12 info-box">
						<a href={this.global.teamInfo.officialSiteUrl}>Official Team Site</a>
					</div>
				</div>)
				: (<div/>)}
				<br/>
				{this.state.team.stat ?
					<div className="row">
						<div className="col-md-2">
						<p>Games Played: {this.state.team.stat.gamesPlayed}</p>
					</div>
					<div className="col-md-2">
						<p>Wins: {this.state.team.stat.wins}</p>
					</div>
					<div className="col-md-2">
						<p>Losses: {this.state.team.stat.losses}</p>
					</div>
					<div className="col-md-2">
						<p>OT: {this.state.team.stat.ot}</p>
					</div>
					<div className="col-md-2">
						<p>Points: {this.state.team.stat.pts}</p>
					</div>
					<div className="col-md-2">
						<p>Goals Against Average: {this.state.team.stat.goalsAgainstPerGame}</p>
					</div>
					<div className="col-md-2">
						<p>Shots Allowed: {this.state.team.stat.shotsAllowed}</p>
					</div>
					<div className="col-md-2">
						<p>Shots Per Game: {this.state.team.stat.shotsPerGame}</p>
					</div>
					<div className="col-md-2">
						<p>Shooting %: {this.state.team.stat.shootingPctg}</p>
					</div>
					<div className="col-md-2">
						<p>Power Play %: {this.state.team.stat.powerPlayPercentage}</p>
					</div>
					<div className="col-md-2">
						<p>Penalty Kill %: {this.state.team.stat.penaltyKillPercentage}</p>
					</div>
					<div className="col-md-2">
						<p>Face Off %: {this.state.team.stat.faceOffWinPercentage}</p>
					</div>
					<div className="col-md-12">
						<Link to={`/team/${this.props.match.params.teamid}/roster`}><h3>Roster</h3></Link>
					</div>
					<div className="col-md-12">

					</div>
					<div>
						<GameRecTeam/>
					</div>
						</div>
				:
				<div/>}
			</div>
		)
	}
}