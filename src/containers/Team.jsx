import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/apiActions';

function Team({ match, api }) {
  const id = match.params.id;
  actions.loadTeam(id)


  return (
    <div>
      team
    </div>
  );
}

const mapStateToProps = (state) => ({
  ...state.api
});

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Team));
