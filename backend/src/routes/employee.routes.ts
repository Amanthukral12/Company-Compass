import { Router } from "express";
import { authenticateSession } from "../middleware/auth";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} from "../controller/employee.controller";

const router = Router();

router.route("/add").post(authenticateSession, createEmployee);
router.route("/").get(authenticateSession, getAllEmployees);
router
  .route("/:employeeId")
  .get(authenticateSession, getEmployeeById)
  .delete(authenticateSession, deleteEmployee)
  .put(authenticateSession, updateEmployee);

export default router;
