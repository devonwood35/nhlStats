import React from "reactn";
import apiCall from "../../utils/apis.js";
import PlayerProfile from "../PlayerProfile/PlayerProfile.js";
import PlayerCard from "../PlayerCard/PlayerCard.js";

export default class Roster extends React.Component {
	state = {
		roster: [],
		player: ""
	}

	componentWillMount() {
		apiCall.getRoster(this.global.teamPage).then(roster => {
			console.log(roster);
			this.setState({
				roster: roster.data.roster
			})
		})
	}

	viewPlayer = event => {
		console.log(event)
		if (this.state.player) {
			this.setState({
				player: ""
			})
		} else {
			this.setState({
				player: event.target.value
			})
		}
	}

	render() {
		return (
			<div className="row">
				{this.state.player ? <PlayerProfile back={this.viewPlayer} player={this.state.player} /> :
				<ul className="col-md-12 list-group list-group-flush">
					{this.state.roster.map(play => (
						<PlayerCard key={play.jerseyNumber} profile={this.viewPlayer} data={play}/>
					))}
				</ul>
				}
			</div>
		)
	}
}