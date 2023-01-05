const express = require('express');
const router = express.Router();

const signsRouter = require('./signs.routes');
const ownersRouter = require('./owners.routes');
const usersRouter = require('./users.routes');

router.use('/laundries/', [signsRouter, ownersRouter, usersRouter]);

module.exports = router;