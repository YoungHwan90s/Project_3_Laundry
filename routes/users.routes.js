const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

// 손님 회원가입
router.post('/user/signUp', usersController.signUp); 
// 손님 메인페이지
router.get('/user/laundry', usersController.getPoints); 
// 세탁서비스 신청
router.post('/user/laundry/newRequest', usersController.newRequests); 
// 내 세탁물 조회
router.get('/user/laundry/list', usersController.getLaundries); 
// 내 세탁물 상세조회
router.get('/user/laundry/list/:laundryId', usersController.getLaundriesDetails); 
// 세탁취소
router.delete('/user/laundry/list/:laundryId/delete', usersController.deleteLaundries); 


module.exports = router;