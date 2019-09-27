import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import News from './containers/News';
import Team from './containers/Team';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="container">
          <div className="side-container">
            <Sidebar />
          </div>
          <div className="main-container">
            <Route exact path="/" component={() => <News />} />
            <Route exact path="/team/:id" component={() => <Team />} />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
