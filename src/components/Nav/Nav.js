import React from "reactn";
import { Link } from 'react-router-dom';
import "./Nav.css";

const Nav = props =>
	<div className="navItem">
		<nav className="navbar navbar-light bg-light justify-content-between">
		  <Link to="/"><div className="navbar-brand">Navbar</div></Link>
		  <a href="https://www.nhl.com/" className="navbar-brand">Nhl.com</a>
		</nav>
	</div>

export default Nav;