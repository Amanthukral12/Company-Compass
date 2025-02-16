/// <reference types="vite-plugin-svgr/client" />
import { useEffect } from "react";
import { useEmployee } from "../hooks/useEmployee";
import { useAuth } from "../hooks/useAuth";
import NavigationBar from "../components/UI/NavigationBar";
import { EmployeesWithAttendance } from "../types/types";
import Person from "../assets/Person-svg.svg?react";
import Loading from "../components/Loading";
const Home = () => {
  const { company, loading } = useAuth();
  const {
    fetchAllEmployeesWithAttendanceSummary,
    employeesWithAttendance,
    loading: employeesLoading,
  } = useEmployee();
  useEffect(() => {
    fetchAllEmployeesWithAttendanceSummary();
  }, []);
  if (loading) {
    <Loading />;
  }
  if (employeesLoading) {
    <Loading />;
  }
  return (
    <div className="bg-[#edf7fd] bg-cover h-screen overflow-hidden flex w-full">
      <div className="w-0 lg:w-1/5 z-5">
        <NavigationBar />
      </div>
      <section className="w-full">
        <div className="bg-white m-3 py-4 px-2 rounded-lg shadow-xl flex flex-col lg:flex-row">
          <div className="flex justify-center  pl-4 mr-2 w-full lg:w-1/5">
            {company?.avatar ? (
              <img
                src={company.avatar}
                alt="company profile photo"
                className="h-48 w-48 rounded-full border-gray-600 border-2"
              />
            ) : (
              <Person />
            )}
          </div>
          <div className="w-4/5">
            <p className="text-4xl text-[#3a4d8fe5] font-bold mb-2">
              {company?.name}
            </p>
            <p className="text-lg text-[#3a4d8fe5] font-semibold my-1">
              {company?.email}
            </p>
            <p className="text-lg text-[#3a4d8fe5] font-semibold my-1">
              No of employees: {employeesWithAttendance.length}
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row">
          {employeesWithAttendance?.map((employee: EmployeesWithAttendance) => (
            <div
              key={employee.id}
              className="bg-white m-3 lg:w-1/2 rounded-lg p-2 text-[#3a4d8fe5] font-medium shadow-xl"
            >
              <p className="font-medium">Name: {employee.name}</p>
              <p>Phone Number: {employee.phoneNumber}</p>
              <p>Total Days Attended: {employee.totalDaysAttended}</p>
              <p>Total Days Absent: {employee.totalAbsentDays}</p>
              <p>Total Hours Worked: {employee.totalHoursWorked}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
