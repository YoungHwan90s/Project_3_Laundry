const { User, Owner, Laundry, OwnerWorkList } = require('../models');
const { Op } = require("sequelize");

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
      createdAt,
    });

    return ownerSignIn;
  };

  // 사장 메인페이지
  findOwnerById = async (ownerId) => {
    const owner = await Owner.findByPk(ownerId);

    return owner;
  };

  // 세탁서비스조회
  findAllLaundries = async (offset) => {
    const allLaundries = await Laundry.findAll({
      offset: offset,
      limit: 3
    });

    return allLaundries;
  };

  // 리뷰 조회
  findMyReviews = async (ownerId) => {
    const getLaundryIds = await OwnerWorkList.findAll({
      where: { ownerId },
    });

    const getLaundryId = getLaundryIds.map((laundry) => {
      return [laundry.laundryId];
    });

    const getLaundryReview = await Laundry.findAll({
      order: [['createdAt', 'desc']],
      where: {
        [Op.and]: [
          { laundryId: getLaundryId },
          { status: "배송 완료" }
        ]
      }
    });
    return getLaundryReview;
  };

  // 세탁서비스조회: 수거하기(작업물로 담기)
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

  // 세탁물 찾기
  findLaundryById = async (laundryId) => {
    const laundry = await Laundry.findByPk(laundryId);

    return laundry;
  };

  // 작업상태 변경
  updateStatus = async (ownerId, laundryId, status) => {
    const updateLaundryStatus = await Laundry.update(
      { status },
      { where: { laundryId } }
    );

    const owner = await Owner.findOne({
      where: { ownerId },
    });

    // 상태가 `배송 완료`일 때 기존 ownerPoint에서 10,000 더해주고...
    if (status === '배송 완료') {
      const ownerPoint = owner.ownerPoint + 10000;

      await Owner.update({ ownerPoint }, { where: { ownerId }
      });

      // await OwnerWorkList.destroy ({ where: {laundryId }})

      return
    }
    return updateLaundryStatus;
  };

  // 작업 취소하기
  deleteWork = async (laundryId) => {
    const updateMyWorkData = await OwnerWorkList.destroy({
      where: { laundryId },
    });

    await Laundry.update({ status: '대기중' }, { where: { laundryId } });

    return updateMyWorkData;
  };
}

module.exports = OwnerRepository;