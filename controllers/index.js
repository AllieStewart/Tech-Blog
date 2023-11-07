// Start of JS file
// Index for routes.
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const dashRoutes = require('./dashboardRoutes.js')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashRoutes);

module.exports = router;
// End of JS file