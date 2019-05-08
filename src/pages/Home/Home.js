import React, { setGlobal } from "reactn";

export default class Home extends React.PureComponent {
	componentWillMount() {
		setGlobal({
			sideBar: -1
		})
	}
	render() {
		return (
			<div className="home">

			</div>
		)
	}
}