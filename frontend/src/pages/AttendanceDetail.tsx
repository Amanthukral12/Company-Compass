import { differenceInHours, format } from "date-fns";
import NavigationBar from "../components/UI/NavigationBar";
import { useEmployee } from "../hooks/useEmployee";
import { useParams, useSearchParams } from "react-router-dom";
import { useAttendance } from "../hooks/useAttendance";
import { useEffect, useMemo, useState } from "react";

const AttendanceDetail = () => {
  const { employee, fetchEmployee } = useEmployee();
  const { employeeId, year, monthnumber } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    fetchMonthlyAttendance,
    attendances,
    addAttendance,
    updateAttendance,
  } = useAttendance();

  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }>({});

  const handleInputChange = (date: string, field: string, value: string) => {
    setFormData((prev) => {
      const existingData =
        prev[date] ||
        newAttendances.find((a) => a.date.toString().split("T")[0] === date) ||
        {};

      const updatedData = {
        ...prev,
        [date]: {
          ...existingData,
          [field]: value,
        },
      };

      const startTime = updatedData[date].startTime;
      const endTime = updatedData[date].endTime;

      if (startTime && endTime) {
        updatedData[date].hours = calculateHours(startTime, endTime);
      }

      return updatedData;
    });
  };

  const calculateHours = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return differenceInHours(end, start) > 0
      ? differenceInHours(end, start)
      : 0;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = (attendance: any, dateKey: Date) => {
    const existingAttendance = newAttendances.find((a) => {
      return a.date === dateKey.toISOString();
    });

    const formattedExisting = {
      ...existingAttendance,
      startTime: existingAttendance?.startTime
        ? new Date(existingAttendance.startTime).toISOString()
        : null,
      endTime: existingAttendance?.endTime
        ? new Date(existingAttendance.endTime).toISOString()
        : null,
    };

    const baseAttendance =
      existingAttendance?.id !== null ? formattedExisting : attendance;

    const updatedAttendance = {
      ...(baseAttendance || {}),
      date: dateKey,
      ...formData[baseAttendance.date.toString().split("T")[0]],
    };

    if (baseAttendance && baseAttendance.id) {
      updateAttendance(
        Number(employeeId),
        Number(baseAttendance.id),
        updatedAttendance
      );
    } else {
      addAttendance(Number(employeeId), updatedAttendance);
    }

    setEditMode((prev) => ({
      ...prev,
      [baseAttendance.date.toString().split("T")[0]]: false,
    }));
  };

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        searchParams.set("currentYear", year!.toString());
        setSearchParams(searchParams);
        await fetchEmployee(Number(employeeId), Number(year));
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployeeDetails();
  }, [employeeId, year, searchParams]);

  useEffect(() => {
    fetchMonthlyAttendance(
      Number(employeeId),
      Number(year),
      Number(monthnumber)
    );
  }, [employeeId, year, monthnumber, fetchMonthlyAttendance]);

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const newAttendances = useMemo(() => {
    return Array.from(
      { length: daysInMonth(Number(monthnumber), Number(year)) },
      (_, i) => {
        const date = new Date(Number(year), Number(monthnumber) - 1, i + 2)
          .toISOString()
          .split("T")[0];

        const existing = attendances.find(
          (entry) => entry.date.toString().split("T")[0] === date
        );
        const formattedExisting = existing
          ? {
              ...existing,
              startTime: existing?.startTime
                ? format(new Date(existing.startTime), "yyyy-MM-dd'T'HH:mm")
                : null,
              endTime: existing?.endTime
                ? format(new Date(existing.endTime), "yyyy-MM-dd'T'HH:mm")
                : null,
            }
          : undefined;

        const newDate = new Date(date).toISOString();

        return (
          formattedExisting || {
            id: null,
            date: newDate,
            startTime: "",
            endTime: "",
            hours: 0,
            status: "",
          }
        );
      }
    );
  }, [attendances, monthnumber, year]);

  return (
    <div className="bg-[#edf7fd] bg-cover h-screen overflow-hidden flex w-full text-[#3a4d8fe5]">
      <div className=" w-0 lg:w-1/5 z-5">
        <NavigationBar />
      </div>
      <section className="w-full lg:w-4/5 overflow-y-auto h-full mb-16">
        <h1 className="font-bold text-3xl m-3 text-[#3a4d8fe5]">
          Employee Attendance Details
        </h1>
        <div className="bg-white m-3 p-2 rounded-lg ">
          <p>Employee Name: {employee?.employee.name}</p>
          <p>Employee Phone Number: {employee?.employee.phoneNumber}</p>
          <p>
            Joining Date:{" "}
            {format(employee?.employee.joinDate ?? new Date(), "dd-MM-yyyy")}
          </p>
        </div>
        <div>
          <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {newAttendances.map((newAttendance, index) => {
              const dateKey = newAttendance.date.toString().split("T")[0];
              const isExisting = Boolean(newAttendance.id);
              const isEditing = editMode[dateKey] || !isExisting;
              return (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-all"
                >
                  <div>
                    <p>{format(newAttendance.date, "dd-MM-yyyy")}</p>
                    <form>
                      <label>Start Time</label>
                      <input
                        type="datetime-local"
                        value={
                          formData[dateKey]?.startTime
                            ? format(
                                new Date(formData[dateKey]?.startTime),
                                "yyyy-MM-dd'T'HH:mm"
                              )
                            : newAttendance.startTime || ""
                        }
                        className="w-full p-2 border rounded-md"
                        onChange={(e) => {
                          handleInputChange(
                            dateKey,
                            "startTime",
                            new Date(e.target.value).toISOString()
                          );
                        }}
                        disabled={!isEditing}
                      />
                      <label className="block text-sm font-medium mt-2">
                        End Time
                      </label>
                      <input
                        type="datetime-local"
                        value={
                          formData[dateKey]?.endTime
                            ? format(
                                new Date(formData[dateKey]?.endTime),
                                "yyyy-MM-dd'T'HH:mm"
                              )
                            : newAttendance.endTime || ""
                        }
                        onChange={(e) =>
                          handleInputChange(
                            dateKey,
                            "endTime",
                            new Date(e.target.value).toISOString()
                          )
                        }
                        className="w-full p-2 border rounded-md"
                        disabled={!isEditing}
                      />

                      <label className="block text-sm font-medium mt-2">
                        Status
                      </label>
                      <select
                        value={
                          formData[dateKey]?.status ||
                          newAttendance.status ||
                          ""
                        }
                        onChange={(e) =>
                          handleInputChange(dateKey, "status", e.target.value)
                        }
                        className="w-full p-2 border rounded-md"
                        disabled={!isEditing}
                      >
                        <option value="">Select Status</option>
                        <option value="PRESENT">Present</option>
                        <option value="ABSENT">Absent</option>
                        <option value="HALF_DAY">Half Day</option>
                        <option value="LEAVE">LEAVE</option>
                      </select>

                      <label className="block text-sm font-medium mt-2">
                        Hours Worked
                      </label>
                      <input
                        type="number"
                        value={
                          formData[dateKey]?.hours || newAttendance.hours || 0
                        }
                        readOnly
                        className="w-full p-2 border rounded-md bg-gray-100"
                      />

                      {isEditing ? (
                        <button
                          type="button"
                          onClick={() => {
                            handleSave(
                              formData[dateKey],
                              new Date(newAttendance.date)
                            );
                          }}
                          className="bg-blue-500 text-white px-4 py-2 mt-3 rounded-md w-full"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setEditMode((prev) => ({
                              ...prev,
                              [dateKey]: true,
                            }))
                          }
                          className="bg-gray-500 text-white px-4 py-2 mt-3 rounded-md w-full"
                        >
                          Edit
                        </button>
                      )}
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AttendanceDetail;
