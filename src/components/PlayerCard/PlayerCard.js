import React from "reactn";

const PlayerCard = props =>
	<li className="list-group-item d-flex justify-content-between">
		<h5>{props.data.person.fullName}</h5>
		<p>{props.data.position.name}</p>
		<button onClick={props.profile} value={props.data.person.id} className="btn btn-primary">Profile</button>
	</li>

export default PlayerCard;