const OwnerRepository = require('../repositories/owners.repository');

class OwnerService {
  ownerRepository = new OwnerRepository();
  // 사장 회원가입
  ownerSignUp = async () => {
    const ownerSignUp = await ownerRepository.ownerSignUp(
      shopName,
      pwd,
      ownerEmail,
      ownerPhone,
      ownerAddress,
      ownerPoint
    );

    return {
      shopName: ownerSignUp.shopName,
      pwd: ownerSignUp.pwd,
      ownerEmail: ownerSignUp.ownerEmail,
      ownerPhone: ownerSignUp.ownerPhone,
      ownerAddress: ownerSignUp.ownerAddress,
      ownerPoint: ownerSignUp.ownerPoint,
    };
  };

  // 사장 메인페이지
  findOwnerById = async (ownerId) => {
    const owner = await this.ownerRepository.findOwnerById(ownerId);

    return {
      shopName: owner.shopName,
      ownerPoint: owner.ownerPoint,
    };
  };

  // 세탁서비스조회
  findAllLaundries = async () => {
    const allLaundries = await this.ownerRepository.findAllLaundries();

    allLaundries.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return allLaundries.map((laundry) => {
      return {
        laundryId: laundry.laundryId,
        laundryName: laundry.laundryName,
        img: laundry.img,
        request: laundry.request,
        status: laundry.status,
        createdAt: laundry.createdAt,
      };
    });
  };

  // 세탁서비스조회: 수거하기
  addToMyWorks = async (ownerId, laundryId) => {
    const updateMyWorkData = await this.ownerRepository.addToMyWorks(
      ownerId,
      laundryId
    );

    return {
      ownerId: updateMyWorkData.ownerId,
      laundryId: updateMyWorkData.laundryId,
    };
  };

  // 작업내역조회
  findAllMyWorks = async (ownerId) => {
    const findAllMyWorks = await this.ownerRepository.findAllMyWorks(ownerId);

    return findAllMyWorks.map((work) => {
      return {
        laundryId: work.laundryId,
        laundryName: work.laundryName,
        img: work.img,
        request: work.request,
        status: work.status,
        createdAt: work.createdAt,
      };
    });
  };

  // 작업 상태변경
  updateStatus = async (laundryId, status) => {
    const findLaundry = await this.ownerRepository.findLaundryById(laundryId);
    if (!findLaundry) throw new Error('작업이 존재하지 않습니다.');

    await this.ownerRepository.updateStatus(laundryId, status);

    const updateLaundryStatus = await this.ownerRepository.findLaundryById(
      laundryId
    );

    return {
      laundryId: updateLaundryStatus.laundryId,
      laundryName: updateLaundryStatus.laundryName,
      img: updateLaundryStatus.img,
      request: updateLaundryStatus.request,
      status: updateLaundryStatus.status,
      createdAt: updateLaundryStatus.createdAt,
    };
  };

  // 작업 취소하기
  deleteWork = async (laundryId) => {
    const findLaundry = await this.ownerRepository.findLaundryById(laundryId);
    if (!findLaundry) throw new Error('작업이 존재하지 않습니다.');

    await this.ownerRepository.deleteWork(laundryId);

    return {
      laundryId: findLaundry.laundryId,
      laundryName: findLaundry.laundryName,
      img: findLaundry.img,
      request: findLaundry.request,
      status: findLaundry.status,
      createdAt: findLaundry.createdAt,
    };
  };
}



module.exports = OwnerService;
