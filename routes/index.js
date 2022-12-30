const express = require('express');
const router = express.Router();

const laundriesRouter = require('./laundries.routes');
router.use('/laundries/', laundriesRouter);



module.exports = router;