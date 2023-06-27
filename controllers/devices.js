import express from "express";
import Device from "../models/Device.js";
import Device_type from "../models/Device_type.js";
import e from "connect-flash";

// const DeviceRouter = express.Router();

//show all devices
export const getDevices = async (req, res) => {
  try {
    const devices = await Device.findAll();
    res.render("devices/index.ejs", {
      devices,
    });
  } catch (err) {
    console.log(err);
  }
};

//get new device page
export const getNewDevice = (req, res) => {
  res.render("devices/new.ejs");
};

//post new device
export const postNewDevice = (req, res) => {
  const { device_type_name, model, serial_number, code, status } = req.body;
  let errors = [];

  //check required fields
  if (!device_type_name || !model || !serial_number || !code || !status) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("devices/new.ejs", {
      errors,
      device_type_name,
      model,
      serial_number,
      code,
      status,
    });
  } else {
    //validation passed
    Device.create({
      device_type_name,
      model,
      serial_number,
      code,
      status,
    })
      .then((device) => {
        req.flash("success_msg", "Device added successfully");
        res.redirect("/devices");
      })
      .catch((err) => console.log(err));
  }
};

//delete device
export const deleteDevice = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id);
    await device.destroy();
    req.flash("success_msg", "Device deleted successfully");
    res.redirect("/devices");
  } catch (err) {
    console.log(err);
  }
};
