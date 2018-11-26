import React, { setGlobal } from "reactn";
import "./SideBtn.css";

export default class SideBtn extends React.PureComponent {
	teamChange = event => {
		setGlobal({
			teamPage: event.target.value,
			teamRoster: 0
		})
	}

	render() {
		return (
			<div>
				<button onClick={this.teamChange} value={this.props.id} className="btn sideBtn" type="button">{this.props.name}</button>
			</div>
		);
	}
}