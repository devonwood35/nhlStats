import React, { setGlobal } from 'reactn';
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import apiCall from "./util/api.js";
import Nav from "./components/Nav/Nav.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import Home from "./pages/Home/Home.js";
import PlayerPage from "./pages/PlayerPage/PlayerPage.js";
import RosterPage from "./pages/RosterPage/RosterPage.js";
import TeamPage from "./pages/TeamPage/TeamPage.js";
import GamePage from "./pages/GamePage/GamePage.js";

export default class App extends React.PureComponent {
  componentDidMount() {
    apiCall.getTeams().then(function(data) {
      let teams = [];
      for (var i = 0; i < data.data.teams.length; i++) {
        let short = data.data.teams[i];
        let tmp = {
          id: short.id,
          name: short.name,
          venue: short.venue,
          firstYearOfPlay: short.firstYearOfPlay,
          division: short.division,
          conference: short.conference,
          officialSiteUrl: short.officialSiteUrl
        }
        teams.push(tmp);
      }
      setGlobal({
        teams: teams
      })
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Nav/>
          <div className="row main-block row-fix">
            <div className="col-md-2">
              <Sidebar teams={this.global.teams} side={this.global.sideBar}/>
            </div>
            <div className="col-md-10">
              <Route exact path={"/"} component={ Home } />
              <Route exact path={"/team/:teamid"} component={ TeamPage } />
              <Route exact path={"/team/:teamid/roster"} component={ RosterPage } />
              <Route exact path={"/team/:teamid/player/:playerid"} component={ PlayerPage } />
              <Route exact path={"/game/:gameid"} component={ GamePage } />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}