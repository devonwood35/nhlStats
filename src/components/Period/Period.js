import React from 'reactn';
import "./Period.css";

const Period = props =>
	<div>
		<div className="card">
			<div className="card-header" id={props.header}>
			  	<h5 className="mb-0">
			    <button className="btn btn-link" data-toggle="collapse" data-target={"#" + props.coll} aria-expanded="true" aria-controls={props.coll}>
			      Period {props.period}
			    </button>
			  	</h5>
			</div>

			<div id={props.coll} className="collapse" aria-labelledby={props.header} data-parent="#accordion">
			  	<div className="card-body">
			  		<div className="row">
			  			<div className="col-md-7 scoreBox">
					  		{props.stats.filter(score => "period" + score.about.period == props.header).map(ele => (
					  			<div key={ele.about.eventId}>
					  				<div className="row">
					  					<img className="scoreLogo col-md-2" src={props.team.away.id == ele.team.id ? props.team.away.url : props.team.home.url}/> 
					  					<h4 className="col-md-6">{ele.players[0].player.fullName}</h4>
					  					<p className="col-md-2">{ele.about.periodTimeRemaining}</p>
					  					<h4 className="col-md-2 goals">{ele.about.goals.home} - {ele.about.goals.away} </h4>
					  				</div>
					  				{ele.players.filter(play => play.playerType != "Goalie" && play.playerType != "Scorer").map(ele2 => (
					  					<p key={ele2.player.id}>A: {ele2.player.fullName}</p>
					  				))}
					  			</div>
					  		))}
			  			</div>
			  			<div className="col-md-5 penatlyBox">
			  			</div>
			  		</div>
			  	</div>
			</div>
		</div>
	</div>

export default Period;