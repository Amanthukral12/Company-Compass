import { ReactNode, useCallback, useReducer } from "react";
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
  const addAttendance = async (employeeId: number, formData: Attendance) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await api.post(
        `/attendance/${employeeId}/add`,
        formData,
        config
      );
      attendanceDispatch({ type: "ADD_ATTENDANCE", payload: res.data.data });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  const deleteAttendance = async (employeeId: number, attendanceId: number) => {
    try {
      const res = await api.delete(`/attendance/${employeeId}/${attendanceId}`);
      attendanceDispatch({ type: "DELETE_ATTENDANCE", payload: attendanceId });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  const updateAttendance = async (
    employeeId: number,
    attendanceId: number,
    formData: Attendance
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await api.put(
        `/attendance/${employeeId}/${attendanceId}`,
        formData,
        config
      );
      attendanceDispatch({ type: "UPDATE_ATTENDANCE", payload: res.data });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMonthlyAttendance = useCallback(
    async (employeeId: number, year: number, monthnumber: number) => {
      try {
        const res = await api.get(
          `/employee/${employeeId}/attendance/${year}/${monthnumber}`
        );
        attendanceDispatch({
          type: "FETCH_MONTHLY_ATTENDANCE",
          payload: res.data.data,
        });
        return res;
      } catch (error) {
        console.log(error);
      }
    },
    [attendanceDispatch]
  );
  return (
    <AttendanceContext.Provider
      value={{
        loading: attendanceState.loading,
        error: attendanceState.error,
        attendance: attendanceState.attendance,
        attendances: attendanceState.attendances,
        addAttendance,
        deleteAttendance,
        updateAttendance,
        fetchMonthlyAttendance,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceProvider;
