import React from 'react';
import { withRouter, Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header-section header-section__primary header-section--shift">
      <Link className="link-remove" to="/">NHL Stat Tracker</Link>
    </div>
  );
}

export default withRouter(Header);
