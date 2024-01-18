import express from "express";
import { db } from "../config/db.js";
import Device_type from "../models/Device_type.js";
import {
  getDeviceTypes,
  getAddDeviceType,
  postAddDeviceType,
  getEditDeviceType,
  postEditDeviceType,
  getDeleteDeviceType,
  postDeleteDeviceType,
} from "../controllers/device_types.js";
import auth from "../config/auth.js";

const DeviceTypeRouter = express.Router();

//show all device types
DeviceTypeRouter.get("/", getDeviceTypes);

//add device type
DeviceTypeRouter.get("/new", auth.ensureAdmin, getAddDeviceType);
DeviceTypeRouter.post("/new", auth.ensureAdmin, postAddDeviceType);

//edit device type
DeviceTypeRouter.get("/edit/:id", auth.ensureAdmin, getEditDeviceType);
DeviceTypeRouter.post("/edit/:id", auth.ensureAdmin, postEditDeviceType);

export default DeviceTypeRouter;
