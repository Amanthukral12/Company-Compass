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

    default:
      return state;
  }
};
