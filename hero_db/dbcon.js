var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_lamartid',
  password        : '7485',
  database        : 'cs340_lamartid'
});
module.exports.pool = pool;
