const { User } = require('../models'); 
const { Laundry  } = require('../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;

class UserRepository {

    findAllUser = async () => {
        const users = await User.findAll(); 

        return users; 
    };

    createUser = async (userId,ID,pwd,userName,userEmail,userPhone,userAddress,userPoint) => {
        const createUserData = await User.create({
            userId,
            ID,
            pwd,
            userName,
            userEmail,
            userPhone,
            userAddress,
            userPoint
        });

        return createUserData; 
    };

    findUserById = async (userId) => {
        const user = await User.findByPk(userId);  
    
        return user;
    };

    findAllLaundry = async (userId) => {
        const myLundry = await Laundry.findAll({
            where:{
              userId: {
                [Op.like]: "%" + userId + "%"
              }
            } 
        });      

        return myLundry; 
    };

    createLaundry = async (laundryId, userId, laundryName, img, request, status, review) => {
        const createLaundryData = await Laundry.create({
            laundryId, 
            userId, 
            laundryName, 
            img, 
            request, 
            status,
            review,
        });
        
        return createLaundryData;
    };

    findLaundryById = async(laundryId) => {
        const laundry = await Laundry.findByPk(laundryId); 

        return laundry; 
    }; 

    deleteLaundry = async(laundryId) => {
        const laundry = await Laundry.destroy({where: {laundryId}});

        return laundry; 
    };

    // 평점 주기 

    updateReview = async(laundryId, review) => {
        const updateLaundryreview = await Laundry.update(
            {review}, 
            {where: {laundryId}}
        );
        
        return updateLaundryreview;
    
    }
}


module.exports = UserRepository;




  