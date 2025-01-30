import { Router } from "express";
import { authenticateSession } from "../middleware/auth";
import { createEmployee } from "../controller/employee.controller";

const router = Router();

router.route("/add").post(authenticateSession, createEmployee);

export default router;
