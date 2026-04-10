const router = require('express').Router();
const homeRouter = require('./home.router');

router.use('/home', homeRouter);

module.exports = router;