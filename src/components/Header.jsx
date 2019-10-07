import React from 'react';
import { withRouter, Link } from 'react-router-dom';

function Header() {
  return (
    <div className="quad-section quad-section__navbar header-section header-section__primary header-section--shift">
      <Link className="first-element align__left link-remove" to="/">Pro Hockey Tracker</Link>
      <div className="second-element">
        <Link className="list--title link-remove btn btn__paginate" to="/standings">Standings</Link>
        <Link className="list--title link-remove btn btn__paginate" to="/schedule">Schedule</Link>
      </div>
    </div>
  );
}

export default withRouter(Header);
