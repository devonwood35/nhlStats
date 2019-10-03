import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import api from '../utils/api';

class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roster: []
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    api.loadRoster(id).then((team) => {
      this.setState({
        roster: team.data.roster
      });
    });
  }

  render() {
    const { roster } = this.state;
    const { match: { params: { id } } } = this.props;

    return (
      <div className="box-container">
        <Link to={`/team/${id}`} className="header-section header-section--shift link-remove padding-small">
          <FontAwesomeIcon icon="angle-double-left" />
          &nbsp;Team
        </Link>
        <div>
          <div className="header-section">Forwards</div>
          {roster.filter((position) => position.position.type === 'Forward').map((player) => (
            <div className="quad-section list" key={player.person.id}>
              <div className="first-element padding-small">
                {player.person.fullName}
              </div>
              <div className="second-element padding-small">
                {player.jerseyNumber}
              </div>
              <div className="third-element padding-small">
                {player.position.abbreviation}
              </div>
              <div className="fourth-element padding-small header-section header-section--small list">
                <Link className="link-remove" to={`/player/${player.person.id}`}>Profile</Link>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="header-section list">Defenseman</div>
          {roster.filter((position) => position.position.type === 'Defenseman').map((player) => (
            <div className="quad-section list" key={player.person.id}>
              <div className="first-element padding-small">
                {player.person.fullName}
              </div>
              <div className="second-element padding-small">
                {player.jerseyNumber}
              </div>
              <div className="third-element padding-small">
                {player.position.abbreviation}
              </div>
              <div className="fourth-element padding-small header-section header-section--small list">
                <Link className="link-remove" to={`/player/${player.person.id}`}>Profile</Link>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="header-section list">Goalies</div>
          {roster.filter((position) => position.position.type === 'Goalie').map((player) => (
            <div className="quad-section list" key={player.person.id}>
              <div className="first-element padding-small">
                {player.person.fullName}
              </div>
              <div className="second-element padding-small">
                {player.jerseyNumber}
              </div>
              <div className="third-element padding-small">
                {player.position.abbreviation}
              </div>
              <div className="fourth-element padding-small header-section header-section--small list">
                <Link className="link-remove" to={`/player/${player.person.id}`}>Profile</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Roster.propTypes = ({
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
});

export default withRouter(Roster);
