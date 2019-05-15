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
						<Link to={`/team/${this.global.teamInfo.id}/roster`}><button className="btn sideBtn" type="button">Roster</button></Link>
						<Link to={"/"}><button className="btn sideBtn" type="button">Back to Home</button></Link>
					</div>
				</div>
			:
				<div className="sideBar">
					<div className="btnDiv">
						<h3 className="sideConf">Eastern</h3>
						<h5 className="sideDivision">Metropolitan</h5>
							{this.props.teams.filter(div => div.division.name === "Metropolitan").map(team => (
								<SideBtn key={team.id} id={team.id} name={team.name}/>
							))}
						<h5 className="sideDivision">Atlantic</h5>
							{this.props.teams.filter(div => div.division.name === "Atlantic").map(team => (
								<SideBtn key={team.id} id={team.id} name={team.name}/>
							))}
						<h3 className="sideConf">Western</h3>
						<h5 className="sideDivision">Central</h5>
							{this.props.teams.filter(div => div.division.name === "Central").map(team => (
								<SideBtn key={team.id} id={team.id} name={team.name}/>
							))}
						<h5 className="sideDivision">Pacific</h5>
							{this.props.teams.filter(div => div.division.name === "Pacific").map(team => (
								<SideBtn key={team.id} id={team.id} name={team.name}/>
							))}
					</div>
				</div>
			
		)
	}
}