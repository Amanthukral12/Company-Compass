import { AttendanceAction, AttendanceState } from "../types/types";

export const AttendanceReducer = (
  state: AttendanceState,
  action: AttendanceAction
): AttendanceState => {
  switch (action.type) {
    case "ADD_ATTENDANCE":
      return {
        loading: false,
        error: null,
        attendances: [...state.attendances, action.payload],
        attendance: null,
      };
    case "FETCH_MONTHLY_ATTENDANCE":
      return {
        loading: false,
        error: null,
        attendances: action.payload,
        attendance: null,
      };
    case "DELETE_ATTENDANCE":
      return {
        loading: false,
        error: null,
        attendance: null,
        attendances: state.attendances.filter(
          (attendance) => attendance.id !== action.payload
        ),
      };
    case "UPDATE_ATTENDANCE":
      return {
        loading: false,
        error: null,
        attendance: null,
        attendances: state.attendances.map((attendance) =>
          attendance.id === action.payload.id ? action.payload : attendance
        ),
      };
    default:
      return state;
  }
};
