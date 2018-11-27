import React, { setGlobal } from "reactn";
import { Link } from "react-router-dom";
import "./TeamPage.css";
import apiCall from "../../util/api.js";

export default class TeamPage extends React.PureComponent {
	componentWillMount() {
		this.callTeam(this.props.match.params.teamid);
	}

	componentDidUpdate(prevProps) {
	    if (prevProps.match.params.teamid !== this.props.match.params.teamid) {
	    	this.callTeam(this.props.match.params.teamid);
	    }
	}

	callTeam = id => {
		apiCall.getTeam(id).then(team => {
			setGlobal({
				teamInfo: team.data.teams[0]
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
				<div className="col-md-12">
					<Link to={`/team/${this.props.match.params.teamid}/roster`}><h3>Roster</h3></Link>
				</div>
			</div>
		)
	}
}