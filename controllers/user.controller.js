const UserService = require('../services/users.service');

class Usercontroller {
  UserService = new UserService();

    getUsers = async (req, res, next) => {
      const users = await this.UserService.findAllUser(); 

      res.status(200).json({ data: users });
    };

    createUser = async (req, res, next) => {
      const {userId,ID,pwd,userName,userEmail,userPhone,userAddress,userPoint} = req.body;
      const createUserData = await this.UserService.createUser(
        userId,
        ID,
        pwd,
        userName,
        userEmail,
        userPhone,
        userAddress,
        userPoint,
      );

      res.status(201).json({ data: createUserData });
    }; 

    // 유저 메인페이지 
    getUserById = async (req, res, next) => {
      //const { id } = res.locals.user;
      const  id  = 1;
      const user = await this.UserService.findUserById(id);
      const userName = user.userName;
      const userPoint = user.userPoint;
      
      res.render('user');

      // res.status(200).json({data: user}); 
    };

    
    createLaundry = async (req, res, next) => {
      try{
        // const { userId } = res.locals.user;
        const { laundryId, laundryName, img, request, status } = req.body; 
        const userId = 1;
        await this.UserService.createLaundry(
          laundryId, 
          userId, 
          laundryName, 
          img, 
          request, 
          status
        );
            
          res.status(201).send({msg:"세탁물이 성공적으로 등록되었습니"});
        } catch(error) {
          res.status(400).json({ errorMessage: error.message });
        }
     };

     // 내 세탁물 조회 
    getLaundry = async (req, res, next) => {
        //  const { userId } = res.locals.user;
        const userId = 1;
        
        const myLundry = await this.UserService.findAllLaundry(userId);

        res.status(200).json({myLundry}); 
        
    };

    // 내 세탁물 상세조회 
    getLaundryById = async (req, res, next) => {
        const { laundryId } = req.params; 
        const laundry = await this.UserService.findLaundryById(laundryId);

        res.status(200).json({data: laundry});
    };

    // 내 세탁물 취소 
    deleteLaundry = async (req, res, next) => {
        const { laundryId } = req.params;
        const deleteLaundry = await this.UserService.deleteLaundry(laundryId);

       // res.status(200).json({data:deleteLaundry});
        res.status(200).send({msg: '세탁물 작업을 취소하였습니다.'}); 
    };

    // 평점 주기 
    updatereview = async (req, res, next) => {
     
        const {laundryId} = req.params; 
        const { review } = req.body;
        await this.UserService.updateReview( laundryId, review);
  
        res.status(201).send({msg: '평점주기가 완료되었습니다.'})
     
        
    };
};


module.exports = Usercontroller;