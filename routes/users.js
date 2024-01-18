import express from "express";
import passport from "passport";
import passportStrategy from "../config/passport.js";
passportStrategy(passport);
import {
  getLogin,
  getLogout,
  getRegister,
  postLogin,
  postRegister,
  getUsers,
  getEditUser,
  postEditUser,
} from "../controllers/users.js";
import auth from "../config/auth.js";

const UserRouter = express.Router();

//Get all users
UserRouter.get("/", auth.ensureAuthenticated, getUsers);

//Login page - now using the login controller
UserRouter.get("/login", getLogin);

//Login handle
UserRouter.post("/login", postLogin);

//Register page
UserRouter.get("/register", getRegister);

//Register handle
UserRouter.post("/register", postRegister);

//edit user
UserRouter.get("/edit/:id", auth.ensureAuthenticated, getEditUser);
UserRouter.post("/edit/:id", auth.ensureAuthenticated, postEditUser);

//Logout handle
UserRouter.get("/logout", auth.ensureAuthenticated, getLogout);

export default UserRouter;
