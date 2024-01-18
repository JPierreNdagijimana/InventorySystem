import express from "express";
import Device_type from "../models/Device_type.js";
import e from "connect-flash";

//show all device types
export const getDeviceTypes = async (req, res) => {
  const device_types = await Device_type.findAll();

  res.render("device_types/index.ejs", { device_types });
};

//add device type
export const getAddDeviceType = (req, res) => {
  res.render("device_types/new.ejs");
};

export const postAddDeviceType = (req, res) => {
  const { name, prefix } = req.body;
  console.log(req.body);
  let errors = [];

  //check required fields
  if (!name || !prefix) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("device_types/new.ejs", {
      errors,
      name,
      prefix,
    });
  } else {
    //validation passed
    Device_type.create({
      name,
      prefix,
    })
      .then((device_type) => {
        req.flash("success_msg", "Device type added successfully");
        res.redirect("/device_types");
      })
      .catch((err) => console.log(err));
  }
};

//edit device type
export const getEditDeviceType = async (req, res) => {
  //check if id exists
  const device_type = await Device_type.findByPk(req.params.id);
  if (!device_type) {
    req.flash("error_msg", "Device type does not exit");
    res.redirect("/device_types");
  } else {
    res.render("device_types/edit.ejs", { device_type });
  }
};

export const postEditDeviceType = async (req, res) => {
  const { name, prefix } = req.body;
  let errors = [];

  //check required fields
  if (!name || !prefix) {
    errors.push({ msg: "Please fill in all fields" });
  }
  const device_type = await Device_type.findByPk(req.params.id);
  //check if there are errors
  if (errors.length > 0) {
    res.render("device_types/edit.ejs", {
      errors,
      device_type,
    });
  } else {
    //validation passed
    Device_type.update({ name, prefix }, { where: { id: req.params.id } })
      .then((device_type) => {
        req.flash("success_msg", "Device type updated successfully");
        res.redirect("/device_types");
      })
      .catch((err) => console.log(err));
  }
};

//delete device type
export const getDeleteDeviceType = async (req, res) => {
  const device_type = await Device_type.findByPk(req.params.id);
  res.render("device_types/delete.ejs", { device_type: device_type });
};

export const postDeleteDeviceType = async (req, res) => {
  await Device_type.destroy({ where: { id: req.params.id } });
  req.flash("success_msg", "Device type deleted successfully");
  res.redirect("/device_types");
};
