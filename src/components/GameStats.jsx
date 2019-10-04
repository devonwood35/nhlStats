import React from 'react';
import PropTypes from 'prop-types';

function GameStats({ liveData }) {
  return (
    <div>
      <div className="header-section list">
        Game Stats
      </div>
      <div className="quint-section quint-section__side-margin list">
        <div className="second-element">
          <div className="padding-small">{liveData.boxscore.teams.home.teamStats.teamSkaterStats.goals}</div>
          <div className="padding-small">{liveData.boxscore.teams.home.teamStats.teamSkaterStats.shots}</div>
          <div className="padding-small">{liveData.boxscore.teams.home.teamStats.teamSkaterStats.hits}</div>
          <div className="padding-small">
            {liveData.boxscore.teams.home.teamStats.teamSkaterStats.faceOffWinPercentage}
            %
          </div>
          <div className="padding-small">
            {liveData.boxscore.teams.home.teamStats.teamSkaterStats.powerPlayGoals}
            /
            {liveData.boxscore.teams.home.teamStats.teamSkaterStats.powerPlayOpportunities}
          </div>
          <div className="padding-small">
            {liveData.boxscore.teams.home.teamStats.teamSkaterStats.powerPlayPercentage}
            %
          </div>
          <div className="padding-small">{liveData.boxscore.teams.home.teamStats.teamSkaterStats.pim}</div>
          <div className="padding-small">{liveData.boxscore.teams.home.teamStats.teamSkaterStats.takeaways}</div>
          <div className="padding-small">{liveData.boxscore.teams.home.teamStats.teamSkaterStats.giveaways}</div>
        </div>
        <div className="third-element">
          <div className="padding-small list--title">Goals</div>
          <div className="padding-small list--title">Shots</div>
          <div className="padding-small list--title">Hits</div>
          <div className="padding-small list--title">FO%</div>
          <div className="padding-small list--title">Power Plays</div>
          <div className="padding-small list--title">PP%</div>
          <div className="padding-small list--title">PiM</div>
          <div className="padding-small list--title">Take Aways</div>
          <div className="padding-small list--title">Give Aways</div>
        </div>
        <div className="fourth-element">
          <div className="padding-small">{liveData.boxscore.teams.away.teamStats.teamSkaterStats.goals}</div>
          <div className="padding-small">{liveData.boxscore.teams.away.teamStats.teamSkaterStats.shots}</div>
          <div className="padding-small">{liveData.boxscore.teams.away.teamStats.teamSkaterStats.hits}</div>
          <div className="padding-small">
            {liveData.boxscore.teams.away.teamStats.teamSkaterStats.faceOffWinPercentage}
            %
          </div>
          <div className="padding-small">
            {liveData.boxscore.teams.away.teamStats.teamSkaterStats.powerPlayGoals}
            /
            {liveData.boxscore.teams.away.teamStats.teamSkaterStats.powerPlayOpportunities}
          </div>
          <div className="padding-small">
            {liveData.boxscore.teams.away.teamStats.teamSkaterStats.powerPlayPercentage}
            %
          </div>
          <div className="padding-small">{liveData.boxscore.teams.away.teamStats.teamSkaterStats.pim}</div>
          <div className="padding-small">{liveData.boxscore.teams.away.teamStats.teamSkaterStats.takeaways}</div>
          <div className="padding-small">{liveData.boxscore.teams.away.teamStats.teamSkaterStats.giveaways}</div>
        </div>
      </div>
    </div>
  );
}

GameStats.propTypes = ({
  liveData: PropTypes.object.isRequired // eslint-disable-line
});

export default GameStats;
