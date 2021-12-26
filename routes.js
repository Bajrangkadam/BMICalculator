const Router = require('express');
const BMICalculator = require('./controllers/BMICalculator');

/**
 * Contains all API routes for the application.
 */
let router = Router();

router.use('/', BMICalculator);

module.exports = router;