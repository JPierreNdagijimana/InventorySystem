import express from "express";
import Device from "../models/Device.js";
import Device_type from "../models/Device_type.js";
import e from "connect-flash";
import { name } from "ejs";

// const DeviceRouter = express.Router();

//show all devices
export const getDevices = async (req, res) => {
  try {
    const devices = await Device.findAll({
      include: "device_type",
    });
    res.render("devices/index.ejs", {
      devices,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getNewDevice = async (req, res) => {
  const device_types = await Device_type.findAll();

  res.render("devices/new.ejs", { device_types });
};

//post new device
export const postNewDevice = async (req, res) => {
  const { device_types_id, model, serial_number } = req.body;
  let errors = [];

  //check required fields
  if (!device_types_id || !model || !serial_number) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    const device_types = await Device_type.findAll();
    res.render("devices/new.ejs", {
      errors,
      device_types_id,
      model,
      serial_number,
      device_types,
    });
  } else {
    //validation passed

    const device_type = await Device_type.findOne({
      attributes: ["prefix"],
      where: { id: device_types_id },
    });

    const code = await generateCode(device_type.prefix);

    try {
      await Device.create({
        device_types_id,
        model,
        serial_number,
        code,
      });

      req.flash("success_msg", "Device added successfully");
      res.redirect("/devices");
    } catch (err) {
      req.flash("error_msg", "There was an error adding the device");
      res.redirect("/devices");
    }
  }
};

async function generateCode(prefix) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = prefix + "-";

  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  // check if code already exists
  const device = await Device.findOne({ where: { code } });

  if (device != null) {
    return generateCode(prefix);
  }

  return code;
}

export const postDecommissionDevice = async (req, res) => {
  const { id } = req.params;

  const device = await Device.findByPk(id);

  if (!device) {
    req.flash("error_msg", "Device not found");
    return res.redirect("/devices");
  } else if (device.status == 1) {
    req.flash("error_msg", "Device is assigned to a user. Unassign first");
    return res.redirect("/assignments");
  } else if (device.status == 2) {
    req.flash("error_msg", "Device is already decommissioned");
    return res.redirect("/devices");
  }

  try {
    const res = await Device.update(
      {
        status: 2,
      },
      { where: { id } }
    );

    if (res[0] == 0) {
      throw new Error("Error updating device status");
    }

    req.flash("success_msg", "Device decommissioned successfully");
  } catch (err) {
    await Device.update(
      {
        status: 0,
      },
      { where: { id } }
    );
    req.flash("error_msg", "There was an error decommissioning the device");
  }
  res.redirect("/devices");
};

export const postRecommissionDevice = async (req, res) => {
  const { id } = req.params;

  const device = await Device.findByPk(id);

  if (!device) {
    req.flash("error_msg", "Device not found");
    return res.redirect("/devices");
  } else if (device.status != 2) {
    req.flash("error_msg", "Device is not decommissioned");
    return res.redirect("/devices");
  }

  try {
    const res = await Device.update(
      {
        status: 0,
      },
      { where: { id } }
    );

    if (res[0] == 0) {
      throw new Error("Error updating device status");
    }

    req.flash("success_msg", "Device recommissioned successfully");
  } catch (err) {
    await Device.update(
      {
        status: 2,
      },
      { where: { id } }
    );
    req.flash("error_msg", "There was an error decommissioning the device");
  }
  res.redirect("/devices");
};
