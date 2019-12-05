import React from 'react';

function Billboard() {
  return (
    <div>
      <div className="align__center">
        How Points are Assigned
      </div>
      <div className="half-section panel panel__grey">
        <div className="first-element">
          <div>Skaters</div>
          <div className="quad-section">
            <div className="third-element align__right">
              <div>Goals:</div>
              <div>Assists:</div>
              <div>Shots on Goal:</div>
              <div>Plus/Minus:</div>
              <div>Blocks:</div>
              <div>Power Play Goals:</div>
              <div>Short Handed Goals:</div>
              <div>Hits:</div>
            </div>
            <div className="fourth-element align__right">
              <div>3 points</div>
              <div>2 points</div>
              <div>0.5 points</div>
              <div>1 points</div>
              <div>0.5 points</div>
              <div>0.5 points</div>
              <div>0.5 points</div>
              <div>0.5 points</div>
            </div>
          </div>
        </div>
        <div className="second-element">
          <div>Goalies</div>
          <div className="quad-section">
            <div className="first-element align__right">
              <div>Wins:</div>
              <div>Goals Against:</div>
              <div>Saves:</div>
              <div>Shutouts:</div>
            </div>
            <div className="second-element align__right">
              <div>3 points</div>
              <div>-1 points</div>
              <div>0.2 points</div>
              <div>2 points</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billboard;
