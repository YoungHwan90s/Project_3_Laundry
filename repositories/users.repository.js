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

    createLaundry = async (laundryId, userId, laundryName, img, request, status) => {
        const createLaundryData = await Laundry.create({
            laundryId, 
            userId, 
            laundryName, 
            img, 
            request, 
            status
        });
        
        return createLaundryData;
    };

    findLaundryById = async(laundryId) => {
        const laundry = await Laundry.findByPk(laundryId); 

        return laundry; 
    }; 

    deleteLaundry = async(laundryId, userId) => {
        const laundry = await Laundry.destroy({where: {laundryId, userId}});

        return laundry; 
    };
}


module.exports = UserRepository;




  