import React from "reactn";
import { Link } from "react-router-dom";

const PlayerCard = props =>
	<li className="list-group-item d-flex justify-content-between">
		<h5>{props.data.person.fullName}</h5>
		<p>{props.data.position.name}</p>
		<Link to={`/team/${props.teamId}/player/${props.playerId}`}><button value={props.data.person.id} className="btn btn-primary">Profile</button></Link>
	</li>

export default PlayerCard;