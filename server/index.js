const express = require('express');
const request = require('request');
const axios = require('axios');
const teams = require('./data/teams');

const app = express();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
