const express = require('express');
const router = express.Router();

const SignsController = require('../controllers/signs.controller');
const signsController = new SignsController();

// 로그인
router.post('/auth', signsController.signIn); 

// 로그아웃
router.post('/auth', signsController.signOut); 

module.exports = router;
