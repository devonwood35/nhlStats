import React from "reactn";
import "./InfoCard.css";

const InfoCard = props =>
	<div className="main-info">	
		<div className="row">
			<div className="stat-block col-md-6">
				{props.data.captain ? "Captain" : ""}
				{props.data.alternateCaptain ? "Alternate Captain" : ""}
				<h3>{props.data.fullName}</h3>
			</div>
			<div className="stat-block col-md-6">
				<h3>{props.team.name}</h3>
			</div>
		</div>
		<div className="row">
			<div className="stat-block col-md-4">
				<p>#{props.data.primaryNumber}</p>
			</div>
			<div className="stat-block col-md-4">
				<p>Position: {props.position.name}</p>
			</div>
			<div className="stat-block col-md-4">
				<p>{props.data.nationality}</p>
			</div>
		</div>
		<div className="row">
			<div className="stat-block col-md-3">
				<p>Age: {props.data.currentAge}</p>
			</div>
			<div className="stat-block col-md-3">
				<p>Height: {props.data.height}</p>
			</div>
			<div className="stat-block col-md-3">
				<p>Weight: {props.data.weight}lbs</p>
			</div>
			<div className="stat-block col-md-3">
				<p>Shoots/Catches: {props.data.shootsCatches}</p>
			</div>
		</div>
	</div>

export default InfoCard;