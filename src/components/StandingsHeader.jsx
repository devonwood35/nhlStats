import React from 'react';
import PropTypes from 'prop-types';

function StandingsHeader({ name }) {
  StandingsHeader.propTypes = ({
    name: PropTypes.string
  });

  return (
    <div className="thirteenth-section background--black">
      <div className="second-element header-section header-section--small">
        {name}
      </div>
      <div className="third-element list--title center--grid padding-large" title="Games Played">
        GP
      </div>
      <div className="fourth-element list--title center--grid padding-large" title="Wins">
        W
      </div>
      <div className="fifth-element list--title center--grid padding-large" title="Losses">
        L
      </div>
      <div className="sixth-element list--title center--grid padding-large" title="Overtime/Shootout Losses">
        OT
      </div>
      <div className="seventh-element list--title center--grid padding-large" title="Points">
        PTS
      </div>
      <div className="eigth-element list--title center--grid padding-large" title="Points Percentage">
        P%
      </div>
      <div className="ninth-element list--title center--grid padding-large" title="Regulation/Overtime Wins">
        ROW
      </div>
      <div className="tenth-element list--title center--grid padding-large" title="Goals For">
        GF
      </div>
      <div className="eleventh-element list--title center--grid padding-large" title="Goals Against">
        GA
      </div>
      <div className="twelfth-element list--title center--grid padding-large" title="GF/GA Difference">
        DIFF
      </div>
      <div className="thirteenth-element list--title center--grid padding-large" title="Streak">
        STRK
      </div>
    </div>
  );
}

StandingsHeader.defaultProps = ({
  name: ''
});

export default StandingsHeader;
