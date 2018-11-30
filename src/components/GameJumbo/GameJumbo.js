import React from 'reactn';
import "./GameJumbo.css";

const GameJumbo = props =>
	<div className="game-jumbo">
		<p>{props.game.gameData.datetime.dateTime}</p>
		<div className="row">
			<div className="col-md-5">
				<div className="image-box">
					<span className="helper"/><img className="team-image" src={props.homeAway.home.url} alt="Home Img" />
				</div>
				<p>Home</p>
				<h1>{props.game.gameData.teams.home.name}</h1>
			</div>
			<div className="col-md-2">
				<span className="helper"/>
				<div className="goal-box">
					<h1>{props.game.liveData.plays.currentPlay.about.goals.home} - {props.game.liveData.plays.currentPlay.about.goals.away}</h1>
					<div>{props.game.liveData.plays.currentPlay.about.periodType === "REGULAR" ? <div/> : props.game.liveData.plays.currentPlay.about.ordinalNum}</div>
				</div>
			</div>
			<div className="col-md-5">
				<div className="image-box">
					<span className="helper"></span><img className="team-image" src={props.homeAway.away.url} alt="Home Img" />
				</div>
				<p>Away</p>
				<h1>{props.game.gameData.teams.away.name}</h1>
			</div>
		</div>
	</div>

export default GameJumbo;