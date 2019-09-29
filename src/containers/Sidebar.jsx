import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from '../components/Button';
import { connect } from 'react-redux';
import * as actions from '../actions/apiActions';

class Sidebar extends Component {
  componentDidMount() {
    const { loadTeams } = this.props;
    loadTeams();
  }

  render() {
    const { teams } = this.props;
    return (
      <div className="side-container">
        {teams.map((team) => (
          <Button name={team.name} id={team.id} key={team.id} />
        ))}
      </div>
    );
  }
}

Sidebar.propTypes = ({
  loadTeams: PropTypes.func.isRequired,
  api: PropTypes.array, // eslint-disable-line
});

Sidebar.defaultProps = {
  api: []
};

const mapStateToProps = (state) => ({
  ...state.api
});

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sidebar));