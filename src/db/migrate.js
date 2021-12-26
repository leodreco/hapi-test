const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

async function run(){
    const db = await open({
        filename: process.env.DB || 'db.sqlite',
        driver: sqlite3.Database
    });

    await db.migrate({
        migrationsPath: path.join(__dirname, 'migrations')
    });

    await db.close();
}

module.exports = { run };
