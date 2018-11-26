import React from "reactn";
import apiCall from "../../utils/apis.js";
import InfoCard from "../InfoCard/InfoCard.js";
import Stats from "../Stats/Stats.js";

export default class PlayerProfile extends React.PureComponent {
	state = {
		player: "",
		position: "",
		team: "",
		stats: []
	}
	// stats this.state.player.stats[0].splits[this.state.player.stats[0].splits.length - 1].season
	componentWillMount() {
		apiCall.getPlayer(this.props.player).then(data => {
			this.setState({
				player: data.data.people[0],
				position: data.data.people[0].primaryPosition,
				team: data.data.people[0].currentTeam,
				stats: data.data.people[0].stats[0].splits
			})
		})
	}

	render() {
		console.log(this.state.player.primaryPosition)
		return (
			<div className="col-md-12 player-box">
				<button onClick={this.props.back} className="btn btn-primary">Back</button>
				<InfoCard data={this.state.player} position={this.state.position} team={this.state.team}/>
				<Stats stats={this.state.stats}/>
			</div>
		)
	}
}