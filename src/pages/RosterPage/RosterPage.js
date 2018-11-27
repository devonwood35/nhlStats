import React, { setGlobal } from "reactn";
import { Link } from 'react-router-dom';
import apiCall from "../../util/api.js";
import PlayerCard from "../../components/PlayerCard/PlayerCard.js";

export default class RosterPage extends React.PureComponent {
	componentWillMount() {
		this.callRoster(this.props.match.params.teamid)
	}

	callRoster = id => {
		apiCall.getRoster(id).then(roster => {
			console.log(roster.data.roster);
			setGlobal({
				roster: roster.data.roster
			})
		})
	}

	render() {
		return (
			<div className="roster-page">
				<ul className="col-md-12 list-group list-group-flush">
					<li className="list-group-item"><h1>Forwards</h1></li>
					{this.global.roster.filter(play => play.position.type === "Forward").map(play => (
						<PlayerCard key={play.jerseyNumber} teamId={this.props.match.params.teamid} playerId={play.person.id} profile={this.viewPlayer} data={play}/>
					))}
					<li className="list-group-item"><h1>Defensemen</h1></li>
					{this.global.roster.filter(play => play.position.type === "Defenseman").map(play => (
						<PlayerCard key={play.jerseyNumber} teamId={this.props.match.params.teamid} playerId={play.person.id} profile={this.viewPlayer} data={play}/>
					))}
					<li className="list-group-item"><h1>Goalies</h1></li>
					{this.global.roster.filter(play => play.position.type === "Goalie").map(play => (
						<PlayerCard key={play.jerseyNumber} teamId={this.props.match.params.teamid} playerId={play.person.id} profile={this.viewPlayer} data={play}/>
					))}
				</ul>
			</div>
		)
	}
}