import React from 'react';
import { withRouter, Link } from 'react-router-dom';

function Header() {
  return (
    <div className="quad-section header-section header-section__primary header-section--shift">
      <Link className="first-element align__left link-remove" to="/">Pro Hockey Tracker</Link>
      <Link className="second-element list--title link-remove" to="/standings">Standings</Link>
      <Link className="third-element list--title link-remove" to="/schedule">Schedule</Link>
    </div>
  );
}

export default withRouter(Header);
