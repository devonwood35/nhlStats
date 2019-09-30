import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/apiActions';
import Button from '../components/Button';

class Sidebar extends Component {
  componentDidMount() {
    const { loadTeams } = this.props;
    loadTeams();
  }

  render() {
    const { teams } = this.props;
    return (
      <div className="side-container">
        <div className="side-section side-section--red">
          <div className="header-title__main header-title--red">Eastern Conference</div>
          <div className="side-element">
            <div className="header-title__secondary">Atlantic Division</div>
            {teams.map((team) => (
              team.division.name === 'Atlantic'
                ? <Button name={team.name} id={team.id} key={team.id} />
                : null
            ))}
          </div>
          <div className="side-element">
            <div className="header-title__secondary">Metropolitan Division</div>
            {teams.map((team) => (
              team.division.name === 'Metropolitan'
                ? <Button name={team.name} id={team.id} key={team.id} />
                : null
            ))}
          </div>
        </div>
        <div className="side-section side-section--blue">
          <div className="header-title__main header-title--blue">Western Conference</div>
          <div className="side-element">
            <div className="header-title__secondary">Central Division</div>
            {teams.map((team) => (
              team.division.name === 'Central'
                ? <Button name={team.name} id={team.id} key={team.id} />
                : null
            ))}
          </div>
          <div className="side-element">
            <div className="header-title__secondary">Pacific Division</div>
            {teams.map((team) => (
              team.division.name === 'Pacific'
                ? <Button name={team.name} id={team.id} key={team.id} />
                : null
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = ({
  loadTeams: PropTypes.func.isRequired,
  teams: PropTypes.array, // eslint-disable-line
});

Sidebar.defaultProps = {
  teams: []
};

const mapStateToProps = (state) => ({
  ...state.api
});

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sidebar));
