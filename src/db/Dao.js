/**
 * @see https://github.com/louislam/node-sqlite3
 */
 const sqlite3 = require('@louislam/sqlite3');
const { open } = require('sqlite');
const { DB } = require('@config');

class Dao {
    static connection(){
        return open({
            filename: DB,
            driver: sqlite3.Database
        });
    }
}

module.exports = Dao;
