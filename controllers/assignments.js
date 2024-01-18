import express from "express";
import Assignment from "../models/Assignment.js";
import Device from "../models/Device.js";
import Employee from "../models/Employee.js";

//get all assignments
export const getAssignments = async (req, res) => {
  const assignments = await Assignment.findAll({
    include: [
      {
        model: Device,
        as: "device",
        attributes: ["id", "code", "serial_number", "status", "model"],
      },
      {
        model: Employee,
        as: "employee",
        attributes: ["id", "email", "first_name", "last_name"],
      },
    ],
  });

  res.render("assignments/index.ejs", { assignments });
};

//get add assignment page
export const getNewAssignment = async (req, res) => {
  try {
    // Get all employees
    const employees = await Employee.findAll({
      attributes: ["id", "email"],
    });

    // query all devices that are not assigned (status = 0)
    const devices = await Device.findAll({
      attributes: ["id", "code"],
      where: {
        status: 0,
      },
    });

    if (devices.length == 0) {
      req.flash("error_msg", "All functioning devices are already assigned");
      res.redirect("/devices");
    }

    res.render("assignments/new.ejs", { employees, devices });
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
};

//post add assignment page
export const postNewAssignment = async (req, res) => {
  const { devices_id, employees_id } = req.body;
  let errors = [];

  //check required fields
  if (!devices_id || !employees_id) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    const employees = await Employee.findAll({
      attributes: ["id", "email"],
    });

    // query all devices that are not assigned (status = 0)
    const devices = await Device.findAll({
      attributes: ["id", "code"],
      where: {
        status: 0,
      },
    });

    res.render("assignments/new.ejs", {
      errors,
      devices,
      employees,
    });
  } else {
    try {
      //validation passed
      const assignment = await Assignment.create({
        devices_id,
        employees_id,
      });
      // update status in device table
      const resp = await Device.update(
        {
          status: 1,
        },
        { where: { id: devices_id } }
      );

      // .then((assignment) => {
      req.flash("success_msg", "Device assigned successfully");
      res.redirect("/assignments");
    } catch (err) {
      console.log(err);
      res.status(500).send("internal server error");
    }
  }
};

export const postUnassignAssignment = async (req, res) => {
  try {
    const resp = await Assignment.update(
      {
        status: 0,
      },
      { where: { id: req.params.id } }
    );

    if (resp[0] == 0) {
      throw new Error("Error completing request");
    }
    // update status in device table
    const ass = await Assignment.findOne({
      attributes: ["devices_id"],
      where: { id: req.params.id },
    });

    await Device.update(
      {
        status: 0,
      },
      { where: { id: ass.devices_id } }
    );

    req.flash("success_msg", "Device unassigned successfully");
  } catch (err) {
    await Assignment.update(
      {
        status: 1,
      },
      { where: { id: req.params.id } }
    );
    req.flash("error_msg", err.message);
  }
  res.redirect("/assignments");
};
