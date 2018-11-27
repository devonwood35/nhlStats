import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

setGlobal({
	teams: [],
	teamInfo: {},
	roster: [],
	player: {}
})

ReactDOM.render(<App />, document.getElementById('root'));
