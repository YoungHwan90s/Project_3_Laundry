const Joi = require('joi');

const signupValidation = Joi.object({
  shopName: Joi.string().required().messages({
    'string.empty': '업체명은 필수 입력 사항입니다.',
  }),
  pwd: Joi.string().min(3).required().messages({
    'string.min': '비밀번호는 3글자 이상이어야 합니다.',
    'string.empty': '비밀번호는 필수 입력 사항입니다.',
  }),
  confirmPwd: Joi.equal(Joi.ref('pwd')).required().messages({
    'any.only': '비밀번호가 일치하지 않습니다.',
  }),
  ownerEmail: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required()
    .messages({
      'string.email': '이메일 형식에 맞지 않습니다.',
    }),
  ownerPhone: Joi.string()
    .length(13)
    .pattern(/^\d{3}-\d{4}-\d{4}$/)
    .required()
    .messages({
      'string.length': '휴대폰번호는 (-)를 포함하여 13자리입니다.',
      'string.pattern.base': '휴대폰번호 형식에 맞게 입력하십시오',
    }),
  ownerAddress: Joi.string().required().messages({
    'string.empty': '업제주소는 필수 입력 사항입니다.',
  }),
});

const postCreateValidation = Joi.object({
  title: Joi.string().not('').required(),
  content: Joi.string().not('').required(),
  userId: Joi.forbidden(),
});

const postUpdateValidation = Joi.object({
  title: Joi.string().optional().not(''),
  content: Joi.string().optional().not(''),
  userId: Joi.forbidden(),
});

const commentCreateValidation = Joi.object({
  content: Joi.string().not('').required(),
  userId: Joi.number().required(),
  postId: Joi.forbidden(),
});

const commnetUpdateValidation = Joi.object({
  content: Joi.string().not(''),
});

module.exports = {
  signupValidation,
  postCreateValidation,
  postUpdateValidation,
  commentCreateValidation,
  commnetUpdateValidation,
};
