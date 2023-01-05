const OwnerService = require('../services/owners.service');

class OwnersController {
  ownerService = new OwnerService();

  // 사장 회원가입
  ownerSignUp = async (req, res, next) => {
    try {
      const { shopName, pwd, ownerEmail, ownerPhone, ownerAddress } = req.body;
      const ownerPoint = 0;

      const createOwnerData = await this.ownerService.ownerSignUp(
        shopName,
        pwd,
        ownerEmail,
        ownerPhone,
        ownerAddress,
        ownerPoint
      );

      res.status(201).json({ data: createOwnerData });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };

  // 사장 메인페이지
  getOwnerPoints = async (req, res, next) => {
    try {
      // const { ownerId } = res.locals.owner;
      const ownerId = 1;
      
      if (!ownerId) throw new Error('포인트 조회에 실패하였습니다');

      const owner = await this.ownerService.findOwnerById(ownerId);
      const shopName = owner.shopName;
      const ownerPoint = owner.ownerPoint;

      res.render('owner', { shopName, ownerPoint });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };

  // 세탁서비스조회
  getLaundries = async (req, res, next) => {
    const { pageNum } = req.query

    let offset = 0

    if(pageNum > 1){
      offset = 3 * (pageNum - 1);
    }

    const laundries = await this.ownerService.findAllLaundries(offset);

    res.status(200).json({ laundries });
  };

  // 리뷰 조회
  getMyReviews = async (req, res, next) => {
    // const { ownerId } = res.locals.owner;
    const ownerId = 1;

    const myReviews = await this.ownerService.findMyReviews(ownerId);

    res.status(200).json({ myReviews });
  }; 

  // 세탁서비스조회: 수거하기(작업물로 담기)
  addToMyWorks = async (req, res, next) => {
    try {
      // const { ownerId } = res.locals.owner;
      const ownerId = 1;
      const { laundryId } = req.params;

      await this.ownerService.addToMyWorks(ownerId, laundryId);

      return res.status(200).send({ msg: '선택하신 세탁물을 작업 목록에 저장하였습니다.' });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };

  // 작업물조회
  getMyWorks = async (req, res, next) => {
    // const { ownerId } = res.locals.owner;
    const ownerId = 1;
    const getMyWork = await this.ownerService.findAllMyWorks(ownerId);

    res.status(200).json({ getMyWork });
  };

  // 작업 상태변경
  updateLaundryStatus = async (req, res, next) => {
    // const { ownerId } = res.locals.owner;
    const ownerId = 1;
    const { laundryId } = req.params;
    const { status } = req.body;

    await this.ownerService.updateStatus(ownerId, laundryId, status);

    res.status(200).send({ msg: '선택하신 세탁물의 상태를 변경하였습니다.' });
  };

  // 작업 취소하기
  deleteWork = async (req, res, next) => {
    const { laundryId } = req.params;
    const deleteWork = await this.ownerService.deleteWork(laundryId);

    res.status(200).send({ msg: '선택하신 세탁물 작업을 취소하였습니다.' });
  };
}

module.exports = OwnersController;
