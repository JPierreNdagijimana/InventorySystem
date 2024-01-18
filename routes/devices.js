import express from "express";
import Device from "../models/Device.js";
import Device_type from "../models/Device_type.js";
import e from "connect-flash";
import {
  getDevices,
  getNewDevice,
  postNewDevice,
  postDecommissionDevice,
  postRecommissionDevice,
} from "../controllers/devices.js";
import auth from "../config/auth.js";

const DeviceRouter = express.Router();

//show all devices
DeviceRouter.get("/", getDevices);

//new device page
DeviceRouter.get("/new", auth.ensureAdmin, getNewDevice);

//add device
DeviceRouter.post("/new", auth.ensureAdmin, postNewDevice);

// Decommission device
DeviceRouter.post(
  "/decommission/:id",
  auth.ensureAdmin,
  postDecommissionDevice
);

// Recommission device
DeviceRouter.post(
  "/recommission/:id",
  auth.ensureAdmin,
  postRecommissionDevice
);

export default DeviceRouter;
