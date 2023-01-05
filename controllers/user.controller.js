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

    getUserById = async (req, res, next) => {
      const { id } = req.params; 
      const user = await this.UserService.findUserById(id);
    
      res.status(200).json({data: user}); 
    };

    createLaundry = async (req, res, next) => {
      // const { userId } = res.locals.user;
      const { laundryId, userId, laundryName, img, request, status } = req.body; 
      const createLaundryData = await this.UserService.createLaundry(
        laundryId, 
        userId, 
        laundryName, 
        img, 
        request, 
        status
      );

      res.status(201).json({ data:createLaundryData });
     };

    getLaundry = async (req, res, next) => {
        const {userId} = req.params; 
        
        const myLundry = await this.UserService.findAllLaundry(userId);

        res.status(200).json({data: myLundry}); 
        
    };


    getLaundryById = async (req, res, next) => {
        const { laundryId } = req.params; 
        const laundry = await this.UserService.findLaundryById(laundryId);

        res.status(200).json({data: laundry});
    };

    deleteLaundry = async (req, res, next) => {
        const { laundryId } = req.params;
        const {userId } = req.params; 
        const deleteLaundry = await this.UserService.deleteLaundry(laundryId, userId);

        res.status(200).json({data:deleteLaundry});
    };

};


module.exports = Usercontroller;