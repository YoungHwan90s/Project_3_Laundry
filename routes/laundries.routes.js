const express = require('express');
const router = express.Router();

const OwnersController = require('../controllers/owners.controller');
const UsersController = require('../controllers/users.controller');
const ownersController = new OwnersController();
const usersController = new UsersController();

// 사장 회원가입
router.post('/owner/signUp', ownersController.signUp); 
// 사장 메인페이지
router.get('/owner/laundry', ownersController.getPoints); 
// 세탁서비스조회
router.get('/owner/laundry/list', ownersController.getLaundries); 
// 세탁서비스조회:수거하기
router.post('/owner/laundry/list/:laundryId', ownersController.collectLaundries); 
// 작업내역조회
router.get('/owner/laundry/ownerWorkList', ownersController.getMyWorks);
// 작업내역 상세조회
router.get('/owner/laundry/ownerWorkList/:laundryId', ownersController.getMyWorkDetails);
// 상태변경
router.put('/owner/laundry/ownerWorkList/:laundryId/edit', ownersController.editStatus);
// 작업취소하기
router.delete('/owner/laundry/ownerWorkList/:laundryId/delete', ownersController.deletecollect);

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
