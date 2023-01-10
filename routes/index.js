const express = require('express');
const router = express.Router();

const signsRouter = require('./signs.routes');
const ownersRouter = require('./owners.routes');
// const usersRouter = require('./users.routes');
const ownerMiddleware = require('../middlewares/owner-middleware.js');

// 미들웨어
router.use('/log', signsRouter);
router.use('/owner', ownerMiddleware, ownersRouter);

module.exports = router;