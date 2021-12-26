/**
 * @see https://github.com/louislam/node-sqlite3
 */
const sqlite3 = require('@louislam/sqlite3');
const { open } = require('sqlite');
const { DB } = require('@config');
const path = require('path');

async function run(){
    const db = await open({
        filename: DB,
        driver: sqlite3.Database
    });

    await db.migrate({
        migrationsPath: path.join(__dirname, 'migrations')
    });

    await db.close();
}

module.exports = { run };
