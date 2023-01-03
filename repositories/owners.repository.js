const { User, Owner, Laundry, OwnerWorkList } = require('../models');

class OwnerRepository {
  // 사장 회원가입
  ownerSignUp = async (
    shopName,
    pwd,
    ownerEmail,
    ownerPhone,
    ownerAddress,
    ownerPoint
  ) => {
    const ownerSignIn = await Owner.create({
      shopName,
      pwd,
      ownerEmail,
      ownerPhone,
      ownerAddress,
      ownerPoint,
    });

    return ownerSignIn;
  };

  // 사장 메인페이지
  findOwnerById = async (ownerId) => {
    const owner = await Owner.findByPk(ownerId);

    return owner;
  };

  // 세탁서비스조회
  findAllLaundries = async () => {
    const allLaundries = await Laundry.findAll();

    return allLaundries;
  };

  // 세탁서비스조회: 수거하기
  addToMyWorks = async (ownerId, laundryId) => {
    const createdAt = new Date();



    const updateMyWorkData = await OwnerWorkList.create({
      ownerId,
      laundryId,
      createdAt,
    });

    await Laundry.update(
      {
        status: '수거중',
      },
      {
        where: { laundryId },
      }
    );

    return updateMyWorkData;
  };

  // 작업물조회
  findAllMyWorks = async (ownerId) => {
    const getLaundryIds = await OwnerWorkList.findAll({
      where: { ownerId },
    });

    const getLaundryId = getLaundryIds.map((laundry) => {
      return [laundry.laundryId];
    });

    const getLaundryInfo = await Laundry.findAll({
      order: [['createdAt', 'desc']],
      where: { laundryId: getLaundryId },
    });

    return getLaundryInfo;
  };

  // 작업상태 변경하기 위한 세탁물 찾기
  findLaundryById = async (laundryId) => {
    const laundry = await Laundry.findByPk(laundryId);

    return laundry;
  };

  // 작업상태 변경
  updateStatus = async (laundryId, status) => {
    const updateLaundryStatus = await Laundry.update(
      { status },
      { where: { laundryId } }
    );

    return updateLaundryStatus;
  };

  // 작업 취소하기
  deleteWork = async (laundryId) => {
    const updateMyWorkData = await OwnerWorkList.destroy({ where: { laundryId } });

    return updateMyWorkData;
  };
}

module.exports = OwnerRepository;
