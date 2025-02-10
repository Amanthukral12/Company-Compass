import { ReactNode, useReducer } from "react";
import { Attendance, AttendanceState } from "../types/types";
import api from "../utils/api";
import { AttendanceContext } from "./AttendanceContext";
import { AttendanceReducer } from "../reducers/AttendanceReducer";

const attendanceInitialState: AttendanceState = {
  attendances: [],
  attendance: null,
  error: null,
  loading: true,
};

const AttendanceProvider = ({ children }: { children: ReactNode }) => {
  const [attendanceState, attendanceDispatch] = useReducer(
    AttendanceReducer,
    attendanceInitialState
  );
  const addAttendance = async ({
    employeeId,
    formData,
  }: {
    employeeId: number;
    formData: Attendance;
  }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await api.post(`${employeeId}/add`, formData, config);
      attendanceDispatch({ type: "ADD_ATTENDANCE", payload: res.data });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AttendanceContext.Provider
      value={{
        loading: attendanceState.loading,
        error: attendanceState.error,
        attendance: attendanceState.attendance,
        attendances: attendanceState.attendances,
        addAttendance,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceProvider;
