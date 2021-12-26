const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

class DaoSatellite {
    static connection(){
        return open({
            filename: process.env.DB || 'db.sqlite',
            driver: sqlite3.Database
        });
    }

    static async get(){
        const db = await DaoSatellite.connection();
        let data = await db.all("SELECT * FROM points");
        await db.close();
        return data;
    }

    static async insert({x, y, message}){
        const db = await DaoSatellite.connection();
        const stmt = await db.prepare("INSERT INTO points VALUES (?, ?, ?, ?)");
        await stmt.run([x, y, message, Math.round((new Date()).getTime() / 1000)]);
        await stmt.finalize();
        await db.close();
    }
}

module.exports = DaoSatellite;
