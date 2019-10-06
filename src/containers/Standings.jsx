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
        <div className="header-section header-section--small list list--title align__left">
          Metropolitan
        </div>
        {standings[0].teamRecords.map((team) => (
          <Division key={team.team.id} team={team} />
        ))}
        <div className="header-section header-section--small list list--title align__left">
          Atlantic
        </div>
        {standings[1].teamRecords.map((team) => (
          <Division key={team.team.id} team={team} />
        ))}
        <div className="header-section list align__left">
          Western Conference
        </div>
        <div className="header-section header-section--small list list--title align__left">
          Central
        </div>
        {standings[2].teamRecords.map((team) => (
          <Division key={team.team.id} team={team} />
        ))}
        <div className="header-section header-section--small list list--title align__left">
          Pacific
        </div>
        {standings[3].teamRecords.map((team) => (
          <Division key={team.team.id} team={team} />
        ))}
      </div>
    );
  }
}

export default Standings;
