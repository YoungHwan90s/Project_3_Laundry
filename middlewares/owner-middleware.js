const jwt = require("jsonwebtoken");
const { Owner } = require("../models");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");

  if (!authToken || authType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  }

  try {
    const { ownerId } = jwt.verify(authToken, "customized-secret-key");
    Owner.findByPk(ownerId).then((owner) => {
      res.locals.owner = owner;
      next();
    });
  } catch (err) {
    res.status(401).send({
      errorMessage: "222이건 사장꺼 로그인 후 이용 가능한 기능입니다.",
    });
  }
};