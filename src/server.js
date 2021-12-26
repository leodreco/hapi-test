const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const migrate = require('./db/migrate');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

async function main(){
    await migrate.run();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    app.use('/api', routes);
    
    app.use('*', (req, res) => {
        return res.status(404).json({message: "Ruta no encontrada"});
    });
    
    app.use((err, req, res, next) => {
        return res.status(err.status || 400).json({
            errors: err.errors,
            message: err.message,
        });
    });
    
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Servidor en ${process.env.APP_DOMAIN || 'http://localhost'}:${3000}`);
    });
}

main();
