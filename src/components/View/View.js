import React from "reactn";
import Roster from "../Roster/Roster.js";
import TeamPage from "../TeamPage/TeamPage.js";

export default class View extends React.PureComponent {
	render() {
		return(
			<div>
				{this.global.teamRoster ? <Roster/> : <TeamPage team={this.global.teamPage}/>}
			</div>
		)
	}
}