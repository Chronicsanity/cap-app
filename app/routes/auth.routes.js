const { verify } = require("../middleware");
const controller = require("../controllers/auth.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/signup",
    [
      verify.checkDuplicateUsernameOrEmail,
      verify.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/signin", controller.signin);

  app.post("/signout", controller.signout);
};