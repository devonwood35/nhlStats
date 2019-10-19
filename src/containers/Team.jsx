import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

    if (!team.name) { return (<div className="loading padding-large">loading...</div>); }

    return (
      <div className="box-container">
        <Link to="/" className="header-section header-section--shift link-remove padding-small">
          <FontAwesomeIcon icon="angle-double-left" />
          &nbsp;Home
        </Link>
        <div className="header-section header-section--large">
          {team.name}
        </div>
        <div className="logo-container">
          {allTeams.teams.filter((data) => data.id === id).map((logo) => (
            <img className="logo logo__main" src={logo.url} alt="logo" key={logo.id} />
          ))}
        </div>
        <div className="quint-section">
          <div className="first-element">
            <div className="list--title padding-small">Conference</div>
            <div className="list padding-small">{team.conference.name}</div>
          </div>
          <div className="second-element">
            <div className="list--title padding-small">Division</div>
            <div className="list padding-small">{team.division.name}</div>
          </div>
          <div className="third-element">
            <div className="list--title padding-small">City</div>
            <div className="list padding-small">{team.venue.city}</div>
          </div>
          <div className="fourth-element">
            <div className="list--title padding-small">Arena</div>
            <div className="list padding-small">{team.venue.name}</div>
          </div>
          <div className="fifth-element">
            <div className="list--title padding-small">Founded</div>
            <div className="list padding-small">{team.firstYearOfPlay}</div>
          </div>
        </div>
        <div className="header-section header-section--small">
          <a className="link-remove" href={team.officialSiteUrl}>Official Team Site</a>
        </div>
        <TeamStats />
        <RecentGames />
        <div className="header-section list">
          <Link className="link-remove" to={`/${id}/roster`}>Roster</Link>
        </div>
        <div className="header-section list">
          <Link className="link-remove" to={`/all_games_team/${id}`}>All Games</Link>
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
