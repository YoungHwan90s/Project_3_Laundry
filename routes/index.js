const express = require('express');
const router = express.Router();

const signsRouter = require('./signs.routes');
const ownersRouter = require('./owners.routes');
// const usersRouter = require('./users.routes');

// 로그인 & 회원가입 컨트롤러
const ctrl = require('../controllers/signs.controller');
router.get('/', ctrl.home);
router.get('/userLogin', ctrl.userLogin);
router.get('/registerUser', ctrl.registerUser); 
router.get('/ownerLogin', ctrl.ownerLogin);
router.get('/registerOwner', ctrl.registerOwner);

// 미들웨어
router.use('/laundries/', [signsRouter, ownersRouter]);

module.exports = router;