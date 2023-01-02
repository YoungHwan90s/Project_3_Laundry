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
      const { ownerId } = res.locals.owner;

      if (!ownerId) throw new Error('포인트 조회에 실패하였습니다');

      const owner = await this.ownerService.findOwnerById(ownerId);

      res.status(200).json({ data: owner });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };

  // 세탁서비스조회
  getLaundries = async (req, res, next) => {
    const laundries = await this.ownerService.findAllLaundries();

    res.status(200).json({ data: laundries });
  };

  // 세탁서비스조회: 수거하기
  addToMyWorks = async (req, res, next) => {
    try {
    const { ownerId } = res.locals.owner;
    const { laundryId } = req.params;

    const addToMyWork = await this.ownerService.addToMyWorks(ownerId, laundryId);
    res.status(200).json({ data: addToMyWork })
    } catch (error) {
        res.status(400).json({ errorMessage: error.message })
    }
  };

  // 작업내역조회
  getMyWorks = async (req, res, next) => {
    const { ownerId } = res.locals.owner;

    const getMyWork = await this.ownerService.findAllMyWorks(ownerId);

    res.status(200).json({ data: getMyWork });
  };
  
  // 작업 상태변경
  updateLaundryStatus = async (req, res, next) => {
    const { laundryId } = req.params;
    const { status } = req.body;

    const updateLaundryStatus = await this.ownerService.updateStatus(laundryId, status);

    res.status(200).json ({ data: updateLaundryStatus });
    
  };

  // 작업 취소하기
  deleteWork = async (req, res, next) => {
    const { laundryId } = req.params;

    const deleteWork = await this.ownerService.deleteWork(laundryId);

    res.status(200).json({ data: deleteWork });
  };
}

module.exports = OwnersController;
