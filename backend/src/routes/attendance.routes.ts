import { Router } from "express";
import { authenticateSession } from "../middleware/auth";
import {
  addAttendance,
  deleteAttendance,
  updateAttendance,
} from "../controller/attendance.controller";

const router = Router();

router.route("/:employeeId/add").post(authenticateSession, addAttendance);
router
  .route("/:employeeId/:attendanceId")
  .delete(authenticateSession, deleteAttendance)
  .put(authenticateSession, updateAttendance);

export default router;
