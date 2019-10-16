import React from 'react';
import { withRouter, Link } from 'react-router-dom';

function Header() {
  return (
    <div className="quad-section quad-section__navbar header-section header-section__primary header-section--shift header-section__navbar header-section--black">
      <Link className="first-element align__left link-remove link-remove--white header-title__main-logo" to="/">
        PHS
        <span className="header-title--tiny-text">
          Pro Hockey Tracker
        </span>
      </Link>
      <div className="second-element">
        <Link className="list--title link-remove link-remove--white btn btn__paginate btn__paginate--no-border" to="/standings">Standings</Link>
        <Link className="list--title link-remove link-remove--white btn btn__paginate btn__paginate--no-border" to="/schedule">Schedule</Link>
        <Link className="list--title link-remove link-remove--white btn btn__paginate btn__paginate--no-border" to="/draft">Draft</Link>
      </div>
    </div>
  );
}

export default withRouter(Header);
