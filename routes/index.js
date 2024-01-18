import express from "express";
const router = express.Router();
import auth from "../config/auth.js";
import { getDashboard } from "../controllers/users.js";

//Home page
router.get("/", (req, res) => res.render("main/home.ejs"));

//dashboard
router.get("/dashboard", auth.ensureAuthenticated, getDashboard);

export default router;
