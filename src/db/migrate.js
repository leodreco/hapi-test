const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');
const { DB } = require('../config');

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
