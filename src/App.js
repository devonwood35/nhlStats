import React, { setGlobal } from 'reactn';
import Nav from "./components/Nav/Nav.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import View from "./components/View/View.js";
import apiCall from "./utils/apis.js";
import './App.css';

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
        teamInfo: teams
      })
    });
  }

  render() {
    return (
      <div className="App">
        <Nav/>
        <div className="row">
          <div className="col-md-2">  
            <Sidebar teams={this.global.teamInfo}/>
          </div>
          <div className="col-md-9">
            {this.global.teamPage ? <View/> : <div/>}
          </div>
        </div>
      </div>
    );
  }
}

// export default App;
