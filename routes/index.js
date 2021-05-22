const router = require('express').Router();

const apiRoutes = require('./api');
// add prefix of `/users` to routes created in `user-routes.js`
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;