import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import Header from './components/Header';
import Sidebar from './containers/Sidebar';
import News from './containers/News';
import Team from './containers/Team';
import Game from './containers/Game';
import Roster from './containers/Roster';
import Player from './containers/Player';
import Standings from './containers/Standings';

library.add(faAngleDoubleLeft);

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="container">
          <Sidebar />
          <div className="main-container">
            <Route exact path="/" component={() => <News />} />
            <Route exact path="/team/:id" component={() => <Team />} />
            <Route exact path="/game/:id/:date" component={() => <Game />} />
            <Route exact path="/:id/roster" component={() => <Roster />} />
            <Route exact path="/player/:id" component={() => <Player />} />
            <Route exact path="/standings" component={() => <Standings />} />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
