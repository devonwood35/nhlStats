import React from "reactn";
import SideBtn from "../SideBtn/SideBtn.js";
import { Link } from 'react-router-dom';
import "./Sidebar.css";

export default class Sidebar extends React.PureComponent {
	render() {
		console.log(this.global.teamInfo)
		return (
				<div className="sideBar">
					<div className="btnDiv">
						<div>
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
				</div>
			
		)
	}
}