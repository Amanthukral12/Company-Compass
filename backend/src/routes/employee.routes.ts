import { Router } from "express";
import { authenticateSession } from "../middleware/auth";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeOverView,
  updateEmployee,
} from "../controller/employee.controller";
import {
  addSalaryHistory,
  deleteSalaryHistory,
  getAllSalaryHistoryForEmployee,
  updateSalaryHistory,
} from "../controller/salaryHistory.controller";
import { getMonthlyAttendance } from "../controller/attendance.controller";

const router = Router();

router.route("/add").post(authenticateSession, createEmployee);
router.route("/").get(authenticateSession, getAllEmployees);
router
  .route("/:employeeId")
  .get(authenticateSession, getEmployeeOverView)
  .delete(authenticateSession, deleteEmployee)
  .put(authenticateSession, updateEmployee);
router
  .route("/:employeeId/salaryHistory")
  .get(authenticateSession, getAllSalaryHistoryForEmployee);
router
  .route("/:employeeId/salaryHistory/add")
  .post(authenticateSession, addSalaryHistory);
router
  .route("/:employeeId/salaryHistory/:salaryHistoryId")
  .delete(authenticateSession, deleteSalaryHistory)
  .put(authenticateSession, updateSalaryHistory);
router
  .route("/:employeeId/attendance/:year/:month")
  .get(authenticateSession, getMonthlyAttendance);

export default router;
