var Pool = require('pg').Pool;

var config = {
    host: 'localhost',
    port: 5432, // different from client port
    database: 'Koala Holla',
    max: 20,
}

var ourPool = new Pool(config);

module.exports = ourPool;