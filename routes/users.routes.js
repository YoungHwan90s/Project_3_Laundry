const express = require("express");
const router = express.Router();


const Usercontroller = require("../controllers/user.controller");
const usercontroller = new Usercontroller(); 



// 임시 테스트 회원가입 구현 
router.get("/customeruser", usercontroller.getUsers);
router.post("/customeruser", usercontroller.createUser);


// 손님 메인 페이지 
router.get("/user/:id", usercontroller.getUserById);

// 내 세탁물 조회 
router.get("/user/laundry/:userId/list", usercontroller.getLaundry);

// 세탁물 등록하기  
router.post("/user/laundry/newRequest/", usercontroller.createLaundry);

// 세탁물 상세조회 
router.get("/user/laundry/list/:laundryId", usercontroller.getLaundryById);

// 세탁물 취소하기 
router.delete("/user/laundry/:userId/list/:laundryId/delete", usercontroller.deleteLaundry);

// 테스트용 
// router.get('/',(req,res) => {
//     res.send("Hello");
// });


module.exports = router;
