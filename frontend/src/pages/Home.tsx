/// <reference types="vite-plugin-svgr/client" />
import { useEffect, useState } from "react";
import { useEmployee } from "../hooks/useEmployee";
import NavigationBar from "../components/UI/NavigationBar";
import { EmployeesWithAttendance } from "../types/types";

import Loading from "../components/Loading";
import Sidebar from "../components/UI/Sidebar";
import { IoMenu } from "react-icons/io5";
import CompanyHeader from "../components/UI/CompanyHeader";
const Home = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  const {
    fetchAllEmployeesWithAttendanceSummary,
    employeesWithAttendance,
    loading: employeesLoading,
  } = useEmployee();
  useEffect(() => {
    fetchAllEmployeesWithAttendanceSummary();
  }, []);

  if (employeesLoading) {
    return <Loading />;
  }
  return (
    <div className="bg-[#edf7fd] bg-cover h-screen overflow-hidden flex flex-col lg:flex-row w-full">
      <div className="w-0 lg:w-1/5 z-5">
        <NavigationBar />
      </div>
      <div className="w-full lg:hidden">
        <IoMenu
          onClick={() => setShowSideBar(true)}
          className={`flex lg:hidden h-8 w-8 ml-3 mt-2 text-[#3a4d8fe5] ${
            showSideBar ? "hidden" : ""
          }`}
        />
        <Sidebar
          shown={showSideBar}
          close={() => setShowSideBar(!showSideBar)}
        />
      </div>

      <section className="w-full lg:w-4/5 overflow-y-auto h-full">
        <CompanyHeader />
        <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {employeesWithAttendance?.map((employee: EmployeesWithAttendance) => (
            <div
              key={employee.id}
              className="bg-white my-3 rounded-lg p-4 text-[#3a4d8fe5] font-medium shadow-xl"
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
