import express from "express";
import {
  getEmployee,
  postEmployee,
  getEmployeeList,
  getEmployeeEdit,
  postEmployeeEdit,
  getEmployeeDelete,
  postEmployeeDelete,
} from "../controllers/employees.js";
import auth from "../config/auth.js";

const EmployeeRouter = express.Router();

//get employee list
EmployeeRouter.get("/", getEmployeeList);

//add employee
EmployeeRouter.get("/new", auth.ensureAdmin, getEmployee);
EmployeeRouter.post("/new", auth.ensureAdmin, postEmployee);

//edit employee
EmployeeRouter.get("/edit/:id", auth.ensureAdmin, getEmployeeEdit);
EmployeeRouter.post("/edit/:id", auth.ensureAdmin, postEmployeeEdit);

export default EmployeeRouter;
