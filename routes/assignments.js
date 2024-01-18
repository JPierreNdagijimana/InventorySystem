import express from "express";
import Assignment from "../models/Assignment.js";
import {
  getAssignments,
  getNewAssignment,
  postNewAssignment,
  postUnassignAssignment,
} from "../controllers/assignments.js";
import auth from "../config/auth.js";

const AssignmentRouter = express.Router();

//show all assignments
AssignmentRouter.get("/", getAssignments);

//new assignment page
AssignmentRouter.get("/new", auth.ensureAdmin, getNewAssignment);
AssignmentRouter.post("/new", auth.ensureAdmin, postNewAssignment);

// Unassign
AssignmentRouter.post(
  "/unassign/:id",
  auth.ensureAdmin,
  postUnassignAssignment
);

export default AssignmentRouter;
