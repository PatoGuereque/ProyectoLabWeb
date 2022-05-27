import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'lostandfound',
});

const connect = () => {
  connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
  });
};

export { connect, connection };
// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//   if (err) throw err;

//   console.log('The solution is: ', rows[0].solution);
// });
