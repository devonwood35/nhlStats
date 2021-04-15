import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/apiActions';
import Billboard from '../components/Billboard';

class Fantasy extends Component {
  // componentDidMount() {
  //   const { loadTeams } = this.props;
  //   loadTeams();
  // }

  render() {
    return (
      <div>
        <Billboard />
        <div className="box-container">
          <div className="align__center">
            Fantasy
          </div>
        </div>
      </div>
    );
  }
}

Fantasy.propTypes = ({
  loadTeams: PropTypes.func.isRequired,
  teams: PropTypes.array, // eslint-disable-line
});

Fantasy.defaultProps = {
  teams: []
};

const mapStateToProps = (state) => ({
  ...state.api
});

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Fantasy));
