const maria = require('mysql');

const connect = maria.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'kyukim',
    password: 'kim13245',
    database: 'my_db'
});

module.exports = connect;