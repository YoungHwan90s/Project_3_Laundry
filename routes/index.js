const express = require('express');
const router = express.Router();

const signsRouter = require('./signs.routes');
const laundriesRouter = require('./laundries.routes');
const usersRouter = require('./users.routes');

router.use('/laundries/', [signsRouter, laundriesRouter, usersRouter]);


module.exports = router;