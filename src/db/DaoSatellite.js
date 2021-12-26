const Dao = require('./Dao');

class DaoSatellite extends Dao {
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
