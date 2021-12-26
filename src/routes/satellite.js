const ValidationExeption = require('@Exceptions/ValidationExeption');
const ApiExeption = require('@Exceptions/ApiExeption');
const { Satellites, satelliteSchema } = require('@Schemas/Satellites');
const router = require('express').Router();
const decryptor = require('../decryptor');
const triangulate = require('../triangulator3000');
const DaoSatellite = require('@db/DaoSatellite');

/**
 * @route('/api/satellite', methods={GET})
 */
router.get('/', async (req, res) => {
    let data = await DaoSatellite.get();
    return res.json(data);
});

/**
 * TODO Optimizar decryptor (El paquete instalado itera 25 veces)
 * @route('/api/satellite', methods={POST})
 */
router.post('/', async (req, res) => {
    const errors = satelliteSchema.validate(req.body);
    if(errors.length > 0){
        throw new ValidationExeption(errors);
    }

    const satellites = req.body.satellites;
    let points = [];
    for(let satellite of satellites){
        let coord =  Satellites.find(item => item.name == satellite.name);
        if(coord === undefined){
            throw new ApiExeption(`El satélite ${satellite.name} no existe`, 404);
        }
        points.push({
            ...coord,
            distance: satellite.distance,
        });
    }

    let message = decryptor(satellites.map(satellite => satellite.message));
    let position = triangulate(points);
    let data = { ...position, message};
    try{
        await DaoSatellite.insert(data);
    }catch(ex){
        throw new ApiExeption(ex.message, 400);
    }
    return res.json(data);
});

module.exports = router;
