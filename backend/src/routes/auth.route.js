import { Router } from "express";
import { registerUser,
  loginUser,
  logoutUser,
  getUser,
  changeCurrentPassword,
  updateUserProfile
 } from "../controller/user.controller.js";
import {
  authChangeCurrentPasswordValidator,
  authloginValidator,
  authRegisterValidator
} from "../validators/auth.validators.js";
import { validate } from "../validators/validate.js";


const router = Router()

router.route("/signup")
            .post(authRegisterValidator(),
            validate,
            registerUser)

router.route("/login")
            .post(authloginValidator(),
            validate,
            loginUser)

router.route("/logout")
            .get(logoutUser)

router.route("/update-profile")
            .put(updateUserProfile)

router.route("/get")
            .get(getUser)

router.route("/change-current/password")
            .put(authChangeCurrentPasswordValidator(),
             validate,
             changeCurrentPassword)


export default router;
