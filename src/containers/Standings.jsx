import React, { Component } from 'react';
import moment from 'moment';
import api from '../utils/api';
import Division from '../components/Division';

class Standings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      standings: []
    };
  }

  componentDidMount() {
    const date = moment().format().split('T')[0];

    api.loadStandings(date).then((teams) => {
      this.setState({
        standings: teams.data.records
      });
    });
  }

  render() {
    const { standings } = this.state;

    if (!standings[0]) { return (<div>loading...</div>); }

    return (
      <div className="box-container">
        <div className="header-section header-section--large">
          Standings
        </div>
        <div className="header-section list align__left">
          Eastern Conference
        </div>
        <div className="twelfth-section background--black">
          <div className="second-element header-section header-section--small">
            Metropolitan
          </div>
          <div className="third-element list--title center--grid">
            GP
          </div>
          <div className="fourth-element list--title center--grid">
            W
          </div>
          <div className="fifth-element list--title center--grid">
            L
          </div>
          <div className="sixth-element list--title center--grid">
            OT
          </div>
          <div className="seventh-element list--title center--grid">
            P
          </div>
          <div className="eigth-element list--title center--grid">
            ROW
          </div>
          <div className="ninth-element list--title center--grid">
            GF
          </div>
          <div className="tenth-element list--title center--grid">
            GA
          </div>
          <div className="eleventh-element list--title center--grid">
            Diff
          </div>
          <div className="twelfth-element list--title center--grid">
            Streak
          </div>
        </div>
        {standings[0].teamRecords.map((team) => (
          <Division key={team.team.id} team={team} />
        ))}
        <div className="twelfth-section background--black">
          <div className="second-element header-section header-section--small">
            Atlantic
          </div>
          <div className="third-element list--title center--grid">
            GP
          </div>
          <div className="fourth-element list--title center--grid">
            W
          </div>
          <div className="fifth-element list--title center--grid">
            L
          </div>
          <div className="sixth-element list--title center--grid">
            OT
          </div>
          <div className="seventh-element list--title center--grid">
            P
          </div>
          <div className="eigth-element list--title center--grid">
            ROW
          </div>
          <div className="ninth-element list--title center--grid">
            GF
          </div>
          <div className="tenth-element list--title center--grid">
            GA
          </div>
          <div className="eleventh-element list--title center--grid">
            Diff
          </div>
          <div className="twelfth-element list--title center--grid">
            Streak
          </div>
        </div>
        {standings[1].teamRecords.map((team) => (
          <Division key={team.team.id} team={team} />
        ))}
        <div className="header-section list align__left">
          Western Conference
        </div>
        <div className="twelfth-section background--black">
          <div className="second-element header-section header-section--small">
            Central
          </div>
          <div className="third-element list--title center--grid">
            GP
          </div>
          <div className="fourth-element list--title center--grid">
            W
          </div>
          <div className="fifth-element list--title center--grid">
            L
          </div>
          <div className="sixth-element list--title center--grid">
            OT
          </div>
          <div className="seventh-element list--title center--grid">
            P
          </div>
          <div className="eigth-element list--title center--grid">
            ROW
          </div>
          <div className="ninth-element list--title center--grid">
            GF
          </div>
          <div className="tenth-element list--title center--grid">
            GA
          </div>
          <div className="eleventh-element list--title center--grid">
            Diff
          </div>
          <div className="twelfth-element list--title center--grid">
            Streak
          </div>
        </div>
        {standings[2].teamRecords.map((team) => (
          <Division key={team.team.id} team={team} />
        ))}
        <div className="twelfth-section background--black">
          <div className="second-element header-section header-section--small">
            Pacific
          </div>
          <div className="third-element list--title center--grid">
            GP
          </div>
          <div className="fourth-element list--title center--grid">
            W
          </div>
          <div className="fifth-element list--title center--grid">
            L
          </div>
          <div className="sixth-element list--title center--grid">
            OT
          </div>
          <div className="seventh-element list--title center--grid">
            P
          </div>
          <div className="eigth-element list--title center--grid">
            ROW
          </div>
          <div className="ninth-element list--title center--grid">
            GF
          </div>
          <div className="tenth-element list--title center--grid">
            GA
          </div>
          <div className="eleventh-element list--title center--grid">
            Diff
          </div>
          <div className="twelfth-element list--title center--grid">
            Streak
          </div>
        </div>
        {standings[3].teamRecords.map((team) => (
          <Division key={team.team.id} team={team} />
        ))}
      </div>
    );
  }
}

export default Standings;
