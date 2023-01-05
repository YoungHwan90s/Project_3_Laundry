const express = require('express');
const router = express.Router();

const signsRouter = require('./signs.routes');
const ownersRouter = require('./owners.routes');
// const usersRouter = require('./users.routes');

// 미들웨어
router.use('/laundries/', [signsRouter, ownersRouter]);

module.exports = router;