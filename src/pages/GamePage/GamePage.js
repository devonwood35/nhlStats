import React from 'reactn';
import "./GamePage.css";
import apiCall from "../../util/api.js";
import GameJumbo from "../../components/GameJumbo/GameJumbo.js";
import Period from "../../components/Period/Period.js";

export default class GamePage extends React.PureComponent {
	state = {
		game: {},
		homeAway: {},
		stars: [],
		scorers: [],
		penalty: []
	}

	getGame = id => {
		apiCall.getGame(id).then(game => {
			console.log(game.data);
			let visit = {};
			for (let i = 0; i < this.global.teamLogos.teams.length; i++) {
				if (this.global.teamLogos.teams[i].id == game.data.gameData.teams.home.id) {
					visit.home = this.global.teamLogos.teams[i];
				} else if (this.global.teamLogos.teams[i].id == game.data.gameData.teams.away.id) {
					visit.away = this.global.teamLogos.teams[i];
				}
			}
			let stars;
			if (game.data.liveData.decisions.firstStar) {
				stars = [
					{
						name: game.data.liveData.decisions.firstStar.fullName,
						id: game.data.liveData.decisions.firstStar.id,
						stats: {}
					},
					{
						name: game.data.liveData.decisions.secondStar.fullName,
						id: game.data.liveData.decisions.secondStar.id,
						stats: {}
					},
					{
						name: game.data.liveData.decisions.thirdStar.fullName,
						id: game.data.liveData.decisions.thirdStar.id,
						stats: {}
					}
				]
				let roster = game.data.liveData.boxscore.teams;
				for (let i = 0; i < stars.length; i++) {
					let keysAway = Object.values(roster.away.players);
					let keysHome = Object.values(roster.home.players);
					for (let k = 0; k < keysAway.length; k++) {
						if (keysAway[k].person.id == stars[i].id) {
							if (keysAway[k].stats.goalieStats) {
								stars[i].stats = keysAway[k].stats.goalieStats;
							} else {
								stars[i].stats = keysAway[k].stats.skaterStats;
							}
						}
					}
					for (let k = 0; k < keysHome.length; k++) {
						if (keysHome[k].person.id == stars[i].id) {
							if (keysHome[k].stats.goalieStats) {
								stars[i].stats = keysHome[k].stats.goalieStats;
							} else {
								stars[i].stats = keysHome[k].stats.skaterStats;
							}
						}
					}
				}
			}
			let scoringPlays = game.data.liveData.plays.scoringPlays;
			let penaltyPlays = game.data.liveData.plays.penaltyPlays;
			let tmpArr = [];
			let tmpArr2 = [];
			for (let i = 0; i < scoringPlays.length; i++) {
				tmpArr.push(game.data.liveData.plays.allPlays[scoringPlays[i]]);
			}
			for (let i = 0; i < penaltyPlays.length; i++) {
				tmpArr2.push(game.data.liveData.plays.allPlays[penaltyPlays[i]]);
			}
			this.setState({
				game: game.data,
				homeAway: visit,
				stars: stars,
				scorers: tmpArr,
				penalty: tmpArr2
			})
		})
	}

	componentWillMount() {
		this.getGame(this.props.match.params.gameid);
	}

	render() {
		return (
			<div className="game-wrapper">
				{this.state.game.gameData ? 
				<div>	
					<GameJumbo homeAway={this.state.homeAway} game={this.state.game}/> 
					{this.state.stars ?
						<div>
							<h2 style={{textAlign: "center", marginTop: 15}}>Three Stars</h2>
							<div className="row star-wrapper">
								{this.state.stars.map(star => (
									<div key={star.id} className="star-block col-md-4">
										<img key={star.id} src="..." alt={star.name}/>
										{star.stats.evenSaves ?
										<div>
											<p>Saves: {star.stats.saves}</p>
											<p>SA: {star.stats.shots}</p>
											<p>Save %: {star.stats.savePercentage.toFixed(1)}</p>
										</div>
										: 
										<div>
											<p>Goals: {star.stats.goals}</p>
											<p>Assists: {star.stats.assists}</p>
											<p>+/-: {star.stats.plusMinus}</p>
										</div>
										}
									</div>
								))}
							</div>
						</div>
					: <div/>}
					<div id="accordion" className="period-wrapper">	
						<Period team={this.state.homeAway} penalty={this.state.penalty} stats={this.state.scorers} header="period1" coll="period1Coll" period="1"/>
						<Period team={this.state.homeAway} penalty={this.state.penalty} stats={this.state.scorers} header="period2" coll="period2Coll" period="2"/>
						<Period team={this.state.homeAway} penalty={this.state.penalty} stats={this.state.scorers} header="period2" coll="period3Coll" period="3"/>
					</div>
				</div>
				: <div/>}
			</div>
		)
	}
}