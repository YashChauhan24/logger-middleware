import express from "express";
import { createUser, getUsers } from "../Controller/User.controller.js";

const router = express();

router.route("/").get(getUsers);
router.route("/").post(createUser);

export default router;
