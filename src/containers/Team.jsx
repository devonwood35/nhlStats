import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TeamStats from '../components/TeamStats';
import RecentGames from '../components/RecentGames';
import allTeams from '../utils/teams.json';
import api from '../utils/api';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: []
    };
  }

  componentDidMount() {
    const { match: { params: { id } }, loadTeam } = this.props;
    api.loadTeam(id).then((t) => {
      this.setState({
        team: t.data.teams[0]
      })
    })
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id } }, loadTeam } = this.props;
    if (prevProps.match.params.id !== id) {
      api.loadTeam(id).then((t) => {
        this.setState({
          team: t.data.teams[0]
        })
      })
    }
  }

  render() {
    const { team } = this.state

    if (!team.name) { return (<div>loading...</div>) };

    return (
      <div>
        <div className="header-section">
          {team.name}
        </div>
        <div className="tri-section">
          <div className="first-element">
            {`${team.conference.name} Conference`}
          </div>
          <div className="second-element">
            {`${team.division.name} Division`}
          </div>
          <div className="third-element">
            <a href={team.officialSiteUrl}>Official Team Site</a>
          </div>
        </div>
        <div className="tri-section">
          <div className="first-element">
            {team.venue.city}
          </div>
          <div className="second-element">
            {team.venue.name}
          </div>
          <div className="third-element">
            {team.firstYearOfPlay}
          </div>
        </div>
        <TeamStats />
        <RecentGames />
      </div>
    );
  }
}

export default withRouter(Team);
