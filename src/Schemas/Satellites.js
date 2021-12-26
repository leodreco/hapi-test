const Schema = require('validate');

const satelliteSchema = new Schema({
    satellites: 
        {
            type: 'array',
            length: { min: 3},
            each: {
                name: {
                    type: 'string',
                    required: true,
                },
                distance: {
                    type: 'number',
                    required: true,
                },
                message: [{
                    type: 'string',
                }],
            }
        }
});

const Satellites = [
    {
        name: 'C3P0',
        x: -500,
        y: -200,
    },
    {
        name: 'BB8',
        x: 100,
        y: -100,
    },
    {
        name: 'R2D2',
        x: 500,
        y: 100,
    }
]

module.exports = {
    Satellites,
    satelliteSchema,
};
