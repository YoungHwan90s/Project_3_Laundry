const express = require('express');
const router = express.Router();
const { User, Owner } = require("../models");
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const ownerMiddleware = require('../middlewares/owner-middleware.js');
const authMiddleware = require('../middlewares/auth-middleware.js');

// 회원가입(일반 고객용)
router.post("/users", async (req, res) => {
  const { ID, userName, pwd, confirmPwd, userEmail, userPhone, userAddress, userPoint } = req.body;
  const createdAt = new Date();

  if (pwd !== confirmPwd) {
    res.status(400).send({
      errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
    });
    return;
  }

  // userEmail or ID가 동일한게 이미 있는지 확인하기 위해 가져온다.
  const existsUsers = await User.findAll({
    where: {
      [Op.or]: [{ userEmail }, { ID }],
    },
  });
  if (existsUsers.length) {
    res.status(400).send({
      errorMessage: "이메일 또는 아이디가 이미 사용중입니다.",
    });
    return;
  }

  await User.create({ ID, userName, pwd, userEmail, userPhone, userAddress, userPoint, createdAt });
  res.status(201).send({});
});


// 로그인(일반 고객용)
router.post("/authUser", async (req, res) => {
    const { userEmail, pwd } = req.body;
  
    const user = await User.findOne({
      where: {
        userEmail,
      },
    });
  
    if (!user || pwd !== user.pwd) {
      res.status(400).send({
        errorMessage: "이메일 또는 패스워드가 틀렸습니다.",
      });
      return;
    }
  
    res.send({
      token: jwt.sign({ userId: user.userId }, "customized-secret-key"),
    });
  });

  // 고객용 로그인미들웨어
router.get('/users/me', authMiddleware, async(req, res) => {
  res.json({user: res.locals.user}); 
});

// 회원가입(세탁 업자용)
router.post("/owners", async (req, res) => {
  const ownerPoint = 0
  const { shopName, pwd, confirmPwd, ownerEmail, ownerPhone, ownerAddress } = req.body;
  const createdAt = new Date();
  console.log(shopName);

  if (pwd !== confirmPwd) {
    res.status(400).send({
      errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
    });
    return;
  }

  // ownerEmail or ownerAddress이 동일한게 이미 있는지 확인하기 위해 가져온다.
  const existsOwners = await Owner.findAll({
    where: {
      [Op.or]: [{ ownerEmail }, { ownerAddress }],
    },
  });
  if (existsOwners.length) {
    res.status(400).send({
      errorMessage: "이메일 또는 업체주소가 이미 존재합니다.",
    });
    return;
  }

  await Owner.create({ shopName, pwd, ownerEmail, ownerPhone, ownerAddress, ownerPoint, createdAt });
  res.status(201).send({});
});

// 로그인(세탁 업자용)
router.post("/authOwner", async (req, res) => {
  const { ownerEmail, pwd } = req.body;

  const owner = await Owner.findOne({
    where: {
      ownerEmail,
    },
  });

  if (!owner || pwd !== owner.pwd) {
    res.status(400).send({
      errorMessage: "이메일 또는 패스워드가 틀렸습니다.",
    });
    return;
  }

  const token = jwt.sign({ ownerId: owner.ownerId }, "customized-secret-key");

  res.send({
    token,
  });
});

// 업자용 로그인미들웨어
router.get('/owners/me', ownerMiddleware, async(req, res) => {
  
  res.send({owner: res.locals.owner}); 
});


module.exports = router;
