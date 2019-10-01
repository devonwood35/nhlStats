import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
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
    const { match: { params: { id } } } = this.props;
    api.loadTeam(id).then((t) => {
      this.setState({
        team: t.data.teams[0]
      });
    });
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id } } } = this.props;
    if (prevProps.match.params.id !== id) {
      api.loadTeam(id).then((t) => {
        this.setState({
          team: t.data.teams[0]
        });
      });
    }
  }

  render() {
    const { team } = this.state;
    const { match: { params: { id } } } = this.props;

    if (!team.name) { return (<div>loading...</div>); }

    return (
      <div className="box-container">
        <div className="header-section">
          {team.name}
        </div>
        <div className="logo-container">
          {allTeams.teams.filter((data) => data.id === id).map((logo) => (
            <img className="logo logo__main" src={logo.url} alt="logo" key={logo.id} />
          ))}
        </div>
        <div className="quint-section">
          <div className="first-element">
            {`${team.conference.name} Conference`}
          </div>
          <div className="second-element">
            {`${team.division.name} Division`}
          </div>
          <div className="third-element">
            {team.venue.city}
          </div>
          <div className="fourth-element">
            {team.venue.name}
          </div>
          <div className="fifth-element">
            {team.firstYearOfPlay}
          </div>
        </div>
        <a href={team.officialSiteUrl}>Official Team Site</a>
        <TeamStats />
        <RecentGames />
        <div className="header-section list">
          <Link className="link-remove" to={`/${id}/roster`}>Roster</Link>
        </div>
      </div>
    );
  }
}

Team.propTypes = ({
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
});

export default withRouter(Team);
