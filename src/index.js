import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

setGlobal({
	players: [],
	teamInfo: [],
	teamPage: "",
	teamRoster: 0
})

ReactDOM.render(<App />, document.getElementById('root'));
