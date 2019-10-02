import React from 'react';
import { withRouter, Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header-section header-section__primary">
      <Link className="link-remove" to="/">Header</Link>
    </div>
  );
}

export default withRouter(Header);
