const { Owner, Laundry } = require('../models');


class OwnerRepository {
findOwnerById = async (userId) => {
    const ownerPoint = await Owner.findByPk(userId);

    return ownerPoint
};

findAllLaundries = async () => {
    const laundries = await Laundry.findall();

    return laundries
};

findLaundryId = async (laundryId) => {
    const collectLaundries = await Laundry.findByPk(laundryId);
    
    return collectLaundries
};



};




module.exports = OwnerRepository;