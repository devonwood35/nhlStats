import React from "reactn";
import "./Stats.css";

export default class Stats extends React.PureComponent {
	state = {
		yearStats: {}
	}

	componentWillMount() {
		let tmp = this.props.stats[this.props.stats.length - 1]
		this.setState({
			yearStats: tmp
		})
	}

	render() {
		return (
			<div className="card stat-card">
				<div className="card-header">
					<h2>Stats</h2>
				</div>
				{this.state.yearStats.stat.evenSaves ? 
					<div className="card-body row stat-info">
						<div className="col-md-6 stat-col">
							<h5>{this.state.yearStats.team.name}</h5>
							<p>Games Played: {this.state.yearStats.stat.games}</p>
							<p>Goal Against Average: {this.state.yearStats.stat.goalAgainstAverage}</p>
							<p>Save Percentage: {this.state.yearStats.stat.savePercentage}</p>
							<p>Goals Against: {this.state.yearStats.stat.goalsAgainst}</p>
						</div>
						<div className="col-md-6 stat-col">
							<p>Wins: {this.state.yearStats.stat.wins}</p>
							<p>Losses: {this.state.yearStats.stat.losses}</p>
							<p>OT: {this.state.yearStats.stat.ot}</p>
							<p>Shots Against: {this.state.yearStats.stat.shotsAgainst}</p>
							<p>Saves: {this.state.yearStats.stat.saves}</p>
						</div>
					</div>
				:
					<div className="card-body row stat-info">
						<div className="col-md-4 stat-col">
							<p>{this.state.yearStats.team.name}</p>
							<p>Games Played: {this.state.yearStats.stat.games}</p>
							<p>Goals: {this.state.yearStats.stat.goals}</p>
							<p>Assists: {this.state.yearStats.stat.assists}</p>
							<p>Points: {this.state.yearStats.stat.points}</p>
							<p>+/-: {this.state.yearStats.stat.plusMinus}</p>
						</div>
						<div className="col-md-4 stat-col">
							<p>Hits: {this.state.yearStats.stat.hits}</p>
							<p>Blocked Shots: {this.state.yearStats.stat.blocked}</p>
							<p>PIM: {this.state.yearStats.stat.pim}</p>
							<p>GWG: {this.state.yearStats.stat.gameWinningGoals}</p>
							<p>PPG: {this.state.yearStats.stat.powerPlayGoals}</p>
							<p>PP Points: {this.state.yearStats.stat.powerPlayPoints}</p>
						</div>
						<div className="col-md-4 stat-col">
							<p>FO %: {this.state.yearStats.stat.faceOffPct}</p>
							<p>Shots: {this.state.yearStats.stat.shots}</p>
							<p>Shot %: {this.state.yearStats.stat.shotPct}</p>
							<p>Time on Ice: {this.state.yearStats.stat.timeOnIce}</p>
							<p>SHG: {this.state.yearStats.stat.shortHandedGoals}</p>
							<p>SH Points: {this.state.yearStats.stat.shortHandedPoints}</p>
						</div>
					</div>
				}
			</div>
		)
	}
}