import React from "reactn";
import SideBtn from "../SideBtn/SideBtn.js";
import { Link } from 'react-router-dom';
import "./Sidebar.css";

export default class Sidebar extends React.PureComponent {
	render() {
		console.log(this.global.teamInfo)
		return (
			this.props.side != -1 ?
				<div className="sideBar">
					<div className="btnDiv">
						<p><Link to={`/team/${this.global.teamInfo.id}/roster`}><button className="btn sideBtn" type="button">Roster</button></Link></p>
						<Link to={"/"}><button className="btn sideBtn" type="button">Back to Home</button></Link>
					</div>
				</div>
			:
				<div className="sideBar">
					<div className="btnDiv">
						<h3>Eastern</h3>
						<h5>Metropolitan</h5>
							{this.props.teams.filter(div => div.division.name === "Metropolitan").map(team => (
								<SideBtn key={team.id} id={team.id} name={team.name}/>
							))}
						<h5>Atlantic</h5>
							{this.props.teams.filter(div => div.division.name === "Atlantic").map(team => (
								<SideBtn key={team.id} id={team.id} name={team.name}/>
							))}
						<h3>Western</h3>
						<h5>Central</h5>
							{this.props.teams.filter(div => div.division.name === "Central").map(team => (
								<SideBtn key={team.id} id={team.id} name={team.name}/>
							))}
						<h5>Pacific</h5>
							{this.props.teams.filter(div => div.division.name === "Pacific").map(team => (
								<SideBtn key={team.id} id={team.id} name={team.name}/>
							))}
					</div>
				</div>
			
		)
	}
}