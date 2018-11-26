import React, {setGlobal} from "reactn";
import "./TeamPage.css";
import apiCall from "../../utils/apis.js";

export default class TeamPage extends React.PureComponent {
	state = {
		team: {}
	}

	componentDidUpdate(prevProps) {
		if (this.props.team !== prevProps.team) {
			this.setState({
				team: this.props.team
			})
			this.callTeam(this.props.team)
		}
	}

	callTeam = () => {
		apiCall.getTeam(this.props.team).then(team => {
			let short = team.data.teams[0];
			let tmp = {
				id: short.id,
				name: short.name,
				venue: short.venue,
				firstYearOfPlay: short.firstYearOfPlay,
				division: short.division,
				conference: short.conference,
				officialSiteUrl: short.officialSiteUrl,
				locationName: short.locationName
			}
			console.log(this)
			this.setState({
				team: tmp
			})
		})
	}

	checkRoster = () => {
		setGlobal({
			teamRoster: 1
		})
	}

	componentWillMount() {
		this.callTeam(this.props.team)
	}

	render() {
		console.log(this.state.team)
		return (
			<div className="team-page row">
				<div className="col-md-12">
					<h1 className="jumbotron">{this.state.team.name}</h1>
				</div>
				{this.state.team.conference ? (
				<div className="row row-fix">
					<div className="col-md-6 info-box">
						<p>{this.state.team.conference.name}</p>
					</div>
					<div className="col-md-6 info-box">
						<p>{this.state.team.division.name} Division</p>
					</div>
					<div className="col-md-4 info-box">
						<p>{this.state.team.venue.name}</p>
					</div>
					<div className="col-md-4 info-box">
						<p>{this.state.team.venue.city}</p>
					</div>
					<div className="col-md-4 info-box">
						<p>Since {this.state.team.firstYearOfPlay}</p>
					</div>
					<div className="col-md-12 info-box">
						<a href={this.state.team.officialSiteUrl}>Official Team Site</a>
					</div>
				</div>)
				: (<div/>)}
				<br/>
				<div className="col-md-12">
					<h3 onClick={this.checkRoster}>Roster</h3>
				</div>
			</div>
		);
	}
}