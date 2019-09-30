import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
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
    return (
      <div>
        <div>
          {roster.filter((position) => position.position.type === 'Forward').map((player) => (
            <div className="quad-section">
              <div className="first-element">
                {player.person.fullName}
              </div>
              <div className="second-element">
                {player.jerseyNumber}
              </div>
              <div className="third-element">
                {player.position.abbreviation}
              </div>
              <div className="fourth-element">
                <Link to={`/player/${player.person.id}`}>Profile</Link>
              </div>
            </div>
          ))}
        </div>
        <div>
          {roster.filter((position) => position.position.type === 'Defenseman').map((player) => (
            <div className="quad-section">
              <div className="first-element">
                {player.person.fullName}
              </div>
              <div className="second-element">
                {player.jerseyNumber}
              </div>
              <div className="third-element">
                {player.position.abbreviation}
              </div>
              <div className="fourth-element">
                <Link to={`/player/${player.person.id}`}>Profile</Link>
              </div>
            </div>
          ))}
        </div>
        <div>
          {roster.filter((position) => position.position.type === 'Goalie').map((player) => (
            <div className="quad-section">
              <div className="first-element">
                {player.person.fullName}
              </div>
              <div className="second-element">
                {player.jerseyNumber}
              </div>
              <div className="third-element">
                {player.position.abbreviation}
              </div>
              <div className="fourth-element">
                <Link to={`/player/${player.person.id}`}>Profile</Link>
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
