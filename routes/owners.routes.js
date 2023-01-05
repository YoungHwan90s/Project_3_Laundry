const express = require('express');
const router = express.Router();
const ownerMiddleware = require('../middlewares/owner-middleware')

const OwnersController = require('../controllers/owners.controller');
const ownersController = new OwnersController();

// 세탁서비스조회
router.get('/owner/laundry_list', ownersController.getLaundries);
// 사장 메인페이지
router.get('/owner', ownerMiddleware, ownersController.getOwnerPoints)
// 세탁서비스조회:수거하기
router.post('/owner/laundry_list/:laundryId/add', ownersController.addToMyWorks); 
// 작업 상태변경
router.put('/owner/ownerWorkList/:laundryId/edit', ownersController.updateLaundryStatus);
// 작업내역조회
router.get('/owner/ownerWorkList', ownersController.getMyWorks);
// 리뷰 조회
router.get('/owner/ownerReview', ownersController.getMyReviews);
// 작업취소하기
router.delete('/owner/ownerWorkList/:laundryId/delete', ownersController.deleteWork);


module.exports = router;
