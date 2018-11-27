import React from "reactn";
import SideBtn from "../SideBtn/SideBtn.js";
import "./Sidebar.css";

export default class Sidebar extends React.PureComponent {
	render() {
		return (
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