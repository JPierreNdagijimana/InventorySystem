import passport from "passport";
import passportStrategy from "../config/passport.js";
passportStrategy(passport);
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import Device from "../models/Device.js";
import Device_type from "../models/Device_type.js";

export const getLogin = async (req, res) => {
  // Check if the user is already logged in
  if (req.user) {
    return res.redirect("/dashboard");
  }

  res.render("users/login.ejs");
};

export const postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
};

export const getRegister = async (req, res) => {
  // Check if the user is already logged in
  if (req.user) {
    return res.redirect("/dashboard");
  }

  res.render("users/register.ejs");
};

export const postRegister = async (req, res) => {
  const { first_name, last_name, username, email, password, password2 } =
    req.body;

  let errors = [];

  //check required fields
  if (
    !first_name ||
    !last_name ||
    !username ||
    !email ||
    !password ||
    !password2
  ) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check password match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  //check password length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("users/register.ejs", {
      errors,
      first_name,
      last_name,
      username,
      email,
      password,
      password2,
    });
  } else {
    //validation passed
    User.findOne({ where: { username: username } }).then((user) => {
      if (user) {
        //user exists
        errors.push({ msg: "Username is already registered" });
        res.render("users/register.ejs", {
          errors,
          first_name,
          last_name,
          username,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          first_name,
          last_name,
          username,
          email,
          password,
        });
        //Hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //Set password to hashed
            newUser.password = hash;
            //Save user
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
};

export const getDashboard = async (req, res) => {
  // Total Users
  const users = await User.count();

  // Total Departments
  const departments = await Department.count();

  // Total Employees
  const employees = await Employee.count();

  // Device Types
  const device_types = await Device_type.count();

  // Total Devices
  const devices = await Device.count();

  // Total assigned devices
  const assigned_devices = await Device.count({
    where: { status: 1 },
  });

  // Total unassigned devices
  const unassigned_devices = await Device.count({
    where: { status: 0 },
  });

  // Total devices in repair
  const decommissioned_devices = await Device.count({
    where: { status: 2 },
  });

  const total = {
    users,
    departments,
    employees,
    device_types,
    devices,
    assigned_devices,
    unassigned_devices,
    decommissioned_devices,
  };

  res.render("users/dashboard.ejs", { total });
};

//show all users
export const getUsers = async (req, res) => {
  const users = await User.findAll({
    include: "role",
  });

  res.render("users/index.ejs", { users });
};

//edit user
export const getEditUser = async (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      res.render("users/edit.ejs", { user: user });
    })
    .catch((err) => console.log(err));
};

export const postEditUser = async (req, res) => {
  const { first_name, last_name, username, email } = req.body;
  User.update(
    {
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
    },
    { where: { id: req.params.id } }
  )
    .then((user) => {
      req.flash("success_msg", "User updated successfully");
      res.redirect("/dashboard");
    })
    .catch((err) => console.log(err));
};

//delete user
export const getDeleteUser = async (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then((user) => {
      req.flash("success_msg", "User deleted successfully");
      res.redirect("/dashboard");
    })
    .catch((err) => console.log(err));
};

export const getLogout = (req, res) => {
  req.logout({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      req.flash("success_msg", "You are logged out");
      res.redirect("/users/login");
    }
  });
};
