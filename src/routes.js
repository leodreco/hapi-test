const router = require('express').Router();
const satelliteRoutes = require('@routes/satellite');

router.use('/satellite', satelliteRoutes);

module.exports = router;
