require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const migrate = require('@db/migrate');
const dotenv = require('dotenv');
const { APP_DOMAIN, PORT } = require('./config');

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
    
    app.listen(PORT, () => {
        console.log(`Servidor en ${APP_DOMAIN}:${PORT}`);
    });
}

main();
