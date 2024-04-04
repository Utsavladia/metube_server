import express from "express";

import { login } from "../controllers/auth.js";
import { register, validateOtp } from "../controllers/register.js";
import { updateChannelData } from "../controllers/channel.js";

const routes = express.Router();
routes.post("/login", login);
routes.post("/register", register);
routes.post("/validate", validateOtp);
routes.patch("/updateChannel/:id", updateChannelData);

export default routes;
