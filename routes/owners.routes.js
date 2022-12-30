const express = require('express');
const router = express.Router();

const OwnersController = require('../controllers/owners.controller');
const ownersController = new OwnersController();

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


module.exports = router;
