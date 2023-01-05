const UserRepository = require('../repositories/users.repository');

class UserService {
    userRepository = new UserRepository();

    findAllUser = async (user) => {
        const allUsers = await this.userRepository.findAllUser();
        console.log({allUsers});
        
        return allUsers.map((user) => {
            return {
                UserId: user.UserId,
                ID: user.ID, 
                pwd: user.pwd,   
                userName: user.userName,
                userEmail: user.userEmail,  
                userPhone: user.userPhone,   
                userAddress: user.userAddress,  
                userPoint: user.userPoint, 
                createdAt: user.createAt,
             };  
        }); 
    };

    createUser = async (userId,ID,pwd,userName,userEmail,userPhone,userAddress,userPoint) => {
        const createUserData = await this.userRepository.createUser(
            userId,
            ID,
            pwd,
            userName,
            userEmail,
            userPhone,
            userAddress,
            userPoint
        );

        return {
                userId: createUserData.null,
                ID: createUserData.ID,
                pwd: createUserData.pwd,
                userName: createUserData.userName,
                userEmail: createUserData.userEmail,  
                userPhone: createUserData.userPhone,   
                userAddress: createUserData.userAddress,  
                userPoint: createUserData.userPoint, 
                createdAt: createUserData.createAt,
            }; 
    };

    findUserById = async (userId) => {
        const findUser = await this.userRepository.findUserById(userId);

        return {
            userPoint: findUser.userPoint, 
        };
    };

    createLaundry = async (laundryId,userId,laundryName,img,request,status) => {
        const createLaundryData = await this.userRepository.createLaundry(
            laundryId, 
            userId, 
            laundryName, 
            img, 
            request, 
            status
        );

        return {
            laundryId:createLaundryData.null,
            userId:createLaundryData.userId,
            laundryName:createLaundryData.laundryName, 
            img:createLaundryData.img, 
            request:createLaundryData.request, 
            status:createLaundryData.status,
            createdAt:createLaundryData.createAt,
        };
    };
    
    findAllLaundry = async (userId) => {
        const allLundry = await this.userRepository.findAllLaundry(userId);
        console.log({allLundry});

        return allLundry.map((userId) => {
            return {

                laundryName: userId.laundryName,
                status:userId.status ,

            };
        });

    };

    findLaundryById = async (laundryId) => {
        const findLaundry = await this.userRepository.findLaundryById(laundryId);

        return {
            laundryId:findLaundry.null,
            userId:findLaundry.userId,
            laundryName:findLaundry.laundryName, 
            img:findLaundry.img, 
            request:findLaundry.request, 
            status:findLaundry.status,
            createdAt:findLaundry.createAt,
        };
    };

    deleteLaundry = async (laundryId, userId) => {
        const findLaundry = await this.userRepository.findLaundryById(laundryId, userId);
        if (!findLaundry) throw new Error("세탁물이 존재하지 않습니다"); 

        await this.userRepository.deleteLaundry(laundryId, userId);

        return {
            laundryId:findLaundry.null,
            userId:findLaundry.userId,
            laundryName:findLaundry.laundryName, 
            img:findLaundry.img, 
            request:findLaundry.request, 
            status:findLaundry.status,
            createdAt:findLaundry.createAt,
        };
    };
}

module.exports = UserService;