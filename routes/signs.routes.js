const express = require('express');
const router = express.Router();
const { User, Owner } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const ownerMiddleware = require('../middlewares/owner-middleware.js');
// const authMiddleware = require('../middlewares/auth-middleware.js');
const { signupValidation } = require('../validations');


// // 회원가입(일반 고객용)
// router.post('/users', async (req, res) => {
//   const {
//     ID,
//     userName,
//     pwd,
//     confirmPwd,
//     userEmail,
//     userPhone,
//     userAddress,
//     userPoint,
//   } = await signupValidation.validateAsync(req.body);

//   const createdAt = new Date();

//   // userEmail or ID가 동일한게 이미 있는지 확인하기 위해 가져온다.
//   const existsUsers = await User.findAll({
//     where: {
//       [Op.or]: [{ userEmail }, { ID }],
//     },
//   });
//   if (existsUsers.length) {
//     res.status(400).send({
//       errorMessage: '이메일 또는 아이디가 이미 사용중입니다.',
//     });
//     return;
//   }

//   const hashedPassword = await bcrypt.hash(pwd, 12);
//   const user = await User.create({
//     ID,
//     userName,
//     pwd: hashedPassword,
//     userEmail,
//     userPhone,
//     userAddress,
//     userPoint,
//     createdAt,
//   });

//   res.status(201).send({user});
// });

// // 로그인(일반 고객용)
// router.post('/authUser', async (req, res) => {
//   const { userEmail, pwd } = req.body;

//   const user = await User.findOne({
//     where: {
//       userEmail,
//     },
//   });

//   if (!user || pwd !== user.pwd) {
//     res.status(400).send({
//       errorMessage: '이메일 또는 패스워드가 틀렸습니다.',
//     });
//     return;
//   }

//   res.send({
//     token: jwt.sign({ userId: user.userId }, 'customized-secret-key'),
//   });
// });

//   // 고객용 로그인미들웨어
// router.get('/users/me', authMiddleware, async(req, res) => {
//   res.json({user: res.locals.user});
// });

// 회원가입(세탁 업자용)
router.post('/ownerSignUp', async (req, res) => {
  try {
    const {shopName, pwd, confirmPwd, ownerEmail, ownerPhone, ownerAddress  } =
    await signupValidation.validateAsync(req.body); 
    

    const ownerPoint = 0;
    const createdAt = new Date();

    // ownerEmail or ownerAddress이 동일한게 이미 있는지 확인하기 위해 가져온다.
    const existsOwners = await Owner.findAll({
      where: {
        [Op.or]: [{ ownerEmail }, { ownerAddress }],
      },
    });
    if (existsOwners.length) {
      res.status(400).send({
        errorMessage: '이메일 또는 업체주소가 이미 존재합니다.',
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(pwd, 12);
    const owner = await Owner.create({
      shopName,
      pwd: hashedPassword,
      ownerEmail,
      ownerPhone,
      ownerAddress,
      ownerPoint,
      createdAt,
    });

    res.status(201).send({ owner });
  } catch (err) {
    console.log(err.details)
    if (err.isJoi) {
      return res.status(422).json({ errorMessage: err.details[0].message });
    }
    res.status(500).json({ errorMessage: err.message });
  }
});

// 로그인(세탁 업자용)
router.post('/authOwner', async (req, res) => {
  const { ownerEmail, pwd } = req.body;

  const owner = await Owner.findOne({
    where: {
      ownerEmail,
    },
  });
  const isPasswordCorrect = await bcrypt.compare(pwd, owner.pwd)

  if (!owner || !isPasswordCorrect) {
    res.status(400).send({
      errorMessage: '이메일 또는 패스워드가 틀렸습니다.',
    });
    return;
  }

  const token = jwt.sign({ ownerId: owner.ownerId }, 'customized-secret-key');

  res.send({
    token,
  });
});

// 업자용 로그인미들웨어
router.get('/owner', ownerMiddleware, async (req, res) => {
  res.send({ owner: res.locals.owner });
});

module.exports = router;
