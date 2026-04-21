const express = require('express');
const validators = require('../middlewares/validator.middlewares');
const authController = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middlewares")

const router = express.Router();

router.post(
  '/register',
  validators.registerUserValidations, 
  authController.registerUser
);
router.post('/login', validators.loginUserValidations,authController.loginUser);
router.get('/me',authMiddleware.authMiddleware, authController.getCurrentUser);
router.get("/logout",authController.logoutUser)

module.exports = router;