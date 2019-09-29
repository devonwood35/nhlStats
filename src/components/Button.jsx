import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';


function Button({ name, id, history }) {
  Button.propTypes = ({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    history: PropTypes.object.isRequired // eslint-disable-line
  })

  function pushHistory(event) {
    const id = event.target.getAttribute('value');
    history.push(`/team/${id}`);
  }

  return (
    <button className="btn__sidebar" onClick={pushHistory} type="button" value={id}>
      {name}
    </button>
  );
}

export default withRouter(Button);
