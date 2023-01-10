const express = require('express');
const router = express.Router();

const OwnersController = require('../controllers/owners.controller');
const ownersController = new OwnersController();


// 세탁서비스조회
router.get('/laundry_list', ownersController.getLaundries);
// 세탁서비스조회:수거하기
router.post('/laundry_list/:laundryId/add', ownersController.addToMyWorks); 
// 작업 상태변경
router.put('/ownerWorkList/:laundryId/edit', ownersController.updateLaundryStatus);
// 작업내역조회
router.get('/ownerWorkList', ownersController.getMyWorks);
// 리뷰 조회
router.get('/ownerReview', ownersController.getMyReviews);
// 작업취소하기
router.delete('/ownerWorkList/:laundryId/delete', ownersController.deleteWork);


module.exports = router;
