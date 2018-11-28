import React, { setGlobal } from "reactn";
import "./PlayerPage.css";
import apiCall from "../../util/api.js";
import Stats from "../../components/Stats/Stats.js";
import StatGraph from "../../components/StatGraph/StatGraph.js";

export default class PlayerPage extends React.PureComponent {
	componentWillMount() {
		this.getPlayer(this.props.match.params.playerid);
	}

	getPlayer = id => {
		apiCall.getPlayer(id).then(player => {
			setGlobal({
				player: player.data.people[0]
			})
		})
	}

	render() {
		console.log(this.global.player)
		return (
			this.global.player.currentTeam ?
			<div>
				<div className="player-page">
					<div className="row player-info">
						<div className="stat-block col-md-5">
							<h3>{this.global.player.fullName}</h3>
						</div>
						<div className="stat-block col-md-1">
							<h3>
							{this.global.player.captain ? "C" : ""}
							{this.global.player.alternateCaptain ? "A" : ""}
							</h3>
						</div>
						<div className="stat-block col-md-6">
							<h3>{this.global.player.currentTeam.name}</h3>
						</div>
					</div>
					<div className="row player-info">
						<div className="stat-block col-md-4">
							<p>#{this.global.player.primaryNumber}</p>
						</div>
						<div className="stat-block col-md-4">
							<p>Position: {this.global.player.primaryPosition.name}</p>
						</div>
						<div className="stat-block col-md-4">
							<p>{this.global.player.nationality}</p>
						</div>
					</div>
					<div className="row player-info">
						<div className="stat-block col-md-3">
							<p>Age: {this.global.player.currentAge}</p>
						</div>
						<div className="stat-block col-md-3">
							<p>Height: {this.global.player.height}</p>
						</div>
						<div className="stat-block col-md-3">
							<p>Weight: {this.global.player.weight}lbs</p>
						</div>
						<div className="stat-block col-md-3">
							<p>Shoots/Catches: {this.global.player.shootsCatches}</p>
						</div>
					</div>
				</div>
				<Stats stats={this.global.player.stats[0].splits}/>
				<StatGraph player={this.props.match.params.playerid}/>
			</div>
			: <div/>
		)
	}
}