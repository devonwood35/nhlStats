var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Uratowel35",
  database: 'nhl_stats'
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query('select * from skaters', function(data) {
//     console.log('returned');
//     console.log(data);
//   })
// });

export default con;
