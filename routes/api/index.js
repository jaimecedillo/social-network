const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes.js');

// add prefix of `/users` to routes created in `user-routes.js`
router.use('/users', userRoutes);
// add prefix of `/thoughts` to routes created in `thoughts-routes.js`
router.use('/thoughts', thoughtRoutes);

module.exports = router;