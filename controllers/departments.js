import express from "express";
import Department from "../models/Department.js";
import e from "connect-flash";

//show all departments
export const getDepartments = async (req, res) => {
  const departments = await Department.findAll();

  res.render("departments/index.ejs", { departments });
};

//new department page
export const getNewDepartment = async (req, res) => {
  res.render("departments/new.ejs");
};

export const postNewDepartment = (req, res) => {
  const { name } = req.body;
  let errors = [];

  //check required fields
  if (!name) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("departments/new.ejs", {
      errors,
      name,
    });
  } else {
    //validation passed
    Department.create({
      name,
    })
      .then((department) => {
        req.flash("success_msg", "Department added successfully");
        res.redirect("/departments");
      })
      .catch((err) => console.log(err));
  }
};

//edit department page
export const getEditDepartment = async (req, res) => {
  const department = await Department.findByPk(req.params.id);

  res.render("departments/edit.ejs", { department });
};
export const postEditDepartment = async (req, res) => {
  const { name } = req.body;
  let errors = [];

  //check required fields
  if (!name) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("departments/edit.ejs", {
      errors,
      name,
    });
  } else {
    //validation passed
    Department.update({ name }, { where: { id: req.params.id } })
      .then((department) => {
        req.flash("success_msg", "Department updated successfully");
        res.redirect("/departments");
      })
      .catch((err) => console.log(err));
  }
};

//delete department
export const getDeleteDepartment = async (req, res) => {
  const department = await Department.findByPk(req.params.id);
  res.render("departments/delete.ejs", { department: department });
};

export const postDeleteDepartment = async (req, res) => {
  await Department.destroy({ where: { id: req.params.id } });
  req.flash("success_msg", "Department deleted successfully");
  res.redirect("/departments");
};
