import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";

import { db } from "./config/db.js";
import { port } from "./config/index.js";
import auth from "./config/auth.js";

//models
import Role from "./models/Role.js";
import User from "./models/User.js";
import Department from "./models/Department.js";
import Employee from "./models/Employee.js";
import Device_type from "./models/Device_type.js";
import Device from "./models/Device.js";
import Assignment from "./models/Assignment.js";

//routes
import router from "./routes/index.js";
import EmployeeRouter from "./routes/employees.js";
import DeviceRouter from "./routes/devices.js";
import DeviceTypeRouter from "./routes/deviceTypes.js";
import AssignmentRouter from "./routes/assignments.js";
import UserRouter from "./routes/users.js";
import DepartmentRouter from "./routes/departments.js";

const __dirname = path.resolve();

//test db
db.authenticate()
  .then(async () => await db.sync())
  .catch((err) => console.log("Error: " + err));

// ASSOCIATIONS

// Connect the roles to the users
Role.hasMany(User, {
  foreignKey: {
    name: "roles_id",
    defaultValue: 1,
  },
  as: "users",
});

// Connect the users to the roles
User.belongsTo(Role, {
  foreignKey: {
    name: "roles_id",
    defaultValue: 1,
  },
  as: "role",
});

// Connect the departments to the employees
Department.hasMany(Employee, {
  foreignKey: {
    name: "departments_id",
  },
  as: "employees",
});

// Connect the employees to the departments
Employee.belongsTo(Department, {
  foreignKey: {
    name: "departments_id",
  },
  as: "department",
});

// Connect the devuce types to the devices
Device_type.hasMany(Device, {
  foreignKey: {
    name: "device_types_id",
  },
  as: "devices",
});

// Connect the devices to the device types
Device.belongsTo(Device_type, {
  foreignKey: {
    name: "device_types_id",
  },
  as: "device_type",
});

// Connect the devices to the assignments
Device.hasMany(Assignment, {
  foreignKey: {
    name: "devices_id",
  },
  as: "assignments",
});

// Connect the assignments to the devices
Assignment.belongsTo(Device, {
  foreignKey: {
    name: "devices_id",
  },
  as: "device",
});

// Connect the employees to the assignments
Employee.hasMany(Assignment, {
  foreignKey: {
    name: "employees_id",
  },
  as: "assignments",
});

// Connect the assignments to the employees
Assignment.belongsTo(Employee, {
  foreignKey: {
    name: "employees_id",
  },
  as: "employee",
});

const app = express();

//set static folder
app.use(express.static(path.join(__dirname, "/public")));

//EJS middleware
app.use(expressLayouts);
app.set("view engine", "ejs");

//bodyparser
app.use(express.urlencoded({ extended: false }));

//express session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg"); //global variable
  res.locals.error_msg = req.flash("error_msg"); //global variable
  res.locals.error = req.flash("error"); //global variable
  res.locals.user_session = req.user || null; //global variable
  res.locals.url = req.url;
  next();
});

//routes
app.use("/", router);
app.use("/users", UserRouter);
app.use("/employees", auth.ensureAuthenticated, EmployeeRouter);
app.use("/departments", auth.ensureAuthenticated, DepartmentRouter);
app.use("/devices", auth.ensureAuthenticated, DeviceRouter);
app.use("/device_types", auth.ensureAuthenticated, DeviceTypeRouter);
app.use("/assignments", auth.ensureAuthenticated, AssignmentRouter);

//set a port
const PORT = port || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
