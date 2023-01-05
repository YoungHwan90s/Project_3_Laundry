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
  findAllLaundries = async (offset) => {
    const allLaundries = await this.ownerRepository.findAllLaundries(offset);

    allLaundries.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return allLaundries.map((laundry) => {
      return {
        laundryId: laundry.laundryId,
        userId: laundry.userId,
        laundryName: laundry.laundryName,
        img: laundry.img,
        request: laundry.request,
        status: laundry.status,
        createdAt: laundry.createdAt,
      };
    });
  };

  // 리뷰 조회
  findMyReviews = async (ownerId) => {
    const myReviews = await this.ownerRepository.findMyReviews(ownerId);
    
    myReviews.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return myReviews.map((laundry) => {
      return {
        laundryId: laundry.laundryId,
        userId: laundry.userId,
        laundryName: laundry.laundryName,
        img: laundry.img,
        request: laundry.request,
        createdAt: laundry.createdAt,
        reveiw: laundry.review
      };
    });
  };

  // 세탁서비스조회: 수거하기
  addToMyWorks = async (ownerId, laundryId) => {
    const findLaundry = await this.ownerRepository.findLaundryById(laundryId);

    if (findLaundry.status !== '대기중') {
      throw new Error('(욕심이 과하시네요...) 이미 작업중인 세탁물 입니다.')
    } else {
      await this.ownerRepository.addToMyWorks(
        ownerId,
        laundryId
      );
    }
    return ;
  };

  // 작업물조회
  findAllMyWorks = async (ownerId) => {
    const findAllMyWorks = await this.ownerRepository.findAllMyWorks(ownerId);

    return findAllMyWorks.map((work) => {
      return {
        laundryId: work.laundryId,
        userId: work.userId,
        laundryName: work.laundryName,
        img: work.img,
        request: work.request,
        status: work.status,
        createdAt: work.createdAt,
      };
    });
  };

  // 작업 상태변경
  updateStatus = async (ownerId, laundryId, status) => {
    const findLaundry = await this.ownerRepository.findLaundryById(laundryId);
    if (!findLaundry) throw new Error('작업이 존재하지 않습니다.');

    await this.ownerRepository.updateStatus(ownerId, laundryId, status);

    return {
      status: findLaundry.status,
    };
  };

  // 작업 취소하기
  deleteWork = async (laundryId) => {
    const findLaundry = await this.ownerRepository.deleteWork(laundryId);

    return findLaundry
  };
}



module.exports = OwnerService;
