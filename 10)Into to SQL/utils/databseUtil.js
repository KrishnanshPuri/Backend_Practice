const mysql = require('mysql2');

const pool =mysql.createPool({
    host: 'localhost',
    user:'root',
    password:'yv28u8hqjc',
    database:'airbnb',
});

module.exports = pool.promise();