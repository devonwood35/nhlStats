import React from "reactn";
import { Link } from 'react-router-dom';
import "./SideBtn.css";

const SideBtn = props =>
	<div>
		<Link to={`/team/${props.id}`}><button value={props.id} className="btn sideBtn" type="button">{props.name}</button></Link>
	</div>

export default SideBtn;