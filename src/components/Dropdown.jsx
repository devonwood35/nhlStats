import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seasons: []
    };
  }

  componentDidMount() {
    api.loadSeasons().then((data) => {
      this.setState({
        seasons: data.data.seasons
      });
    });
  }

  render() {
    const { seasons } = this.state;
    const { click } = this.props;

    if (!seasons[0]) { return (<div className="loading padding-large">loading...</div>); }

    return (
      <select onChange={click} className="dropdown">
        {seasons.map((season) => (
          <option className="option" key={season.seasonId} value={season.seasonId}>{season.seasonId}</option>
        )).reverse()}
      </select>
    );
  }
}

Dropdown.propTypes = {
  click: PropTypes.func.isRequired
};

export default Dropdown;
