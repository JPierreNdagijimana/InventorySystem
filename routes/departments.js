import express from "express";
import Department from "../models/Department.js";
import {
  getDepartments,
  getNewDepartment,
  postNewDepartment,
  getEditDepartment,
  postEditDepartment,
  getDeleteDepartment,
  postDeleteDepartment,
} from "../controllers/departments.js";
import auth from "../config/auth.js";

const DepartmentRouter = express.Router();

//show all departments
DepartmentRouter.get("/", getDepartments);

//new department page
DepartmentRouter.get("/new", auth.ensureAdmin, getNewDepartment);
DepartmentRouter.post("/new", auth.ensureAdmin, postNewDepartment);

//edit department page
DepartmentRouter.get("/edit/:id", auth.ensureAdmin, getEditDepartment);
DepartmentRouter.post("/edit/:id", auth.ensureAdmin, postEditDepartment);

export default DepartmentRouter;
