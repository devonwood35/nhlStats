import React from 'react';
import PropTypes from 'prop-types';

function StandingsHeader({ name }) {
  StandingsHeader.propTypes = ({
    name: PropTypes.string
  });

  return (
    <div className="twelfth-section background--black">
      <div className="second-element header-section header-section--small">
        {name}
      </div>
      <div className="third-element list--title center--grid padding-large">
        GP
      </div>
      <div className="fourth-element list--title center--grid padding-large">
        W
      </div>
      <div className="fifth-element list--title center--grid padding-large">
        L
      </div>
      <div className="sixth-element list--title center--grid padding-large">
        OT
      </div>
      <div className="seventh-element list--title center--grid padding-large">
        PTS
      </div>
      <div className="eigth-element list--title center--grid padding-large">
        ROW
      </div>
      <div className="ninth-element list--title center--grid padding-large">
        GF
      </div>
      <div className="tenth-element list--title center--grid padding-large">
        GA
      </div>
      <div className="eleventh-element list--title center--grid padding-large">
        DIFF
      </div>
      <div className="twelfth-element list--title center--grid padding-large">
        STRK
      </div>
    </div>
  );
}

StandingsHeader.defaultProps = ({
  name: ''
});

export default StandingsHeader;
