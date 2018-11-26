import React from "reactn";
import SideBtn from "../SideBtn/SideBtn.js";
import "./Sidebar.css";

export default class Sidebar extends React.PureComponent {
	render() {
		return (
			<div className="sideBar">
				<div className="btnDiv">
					{this.props.teams.map(team => (
						<SideBtn key={team.id} id={team.id} name={team.name}/>
					))}
				</div>
			</div>
		)
	}
}