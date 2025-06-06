import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useEmployee } from "../hooks/useEmployee";
import Loading from "../components/Loading";
import NavigationBar from "../components/UI/NavigationBar";
import { format } from "date-fns";
import { IoMenu } from "react-icons/io5";
import Sidebar from "../components/UI/Sidebar";
import { IoMdArrowBack } from "react-icons/io";

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const [showSideBar, setShowSideBar] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchEmployee, employee, loading } = useEmployee();

  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        searchParams.set("currentYear", year.toString());
        setSearchParams(searchParams);
        await fetchEmployee(Number(employeeId), Number(year));
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployeeDetails();
  }, [employeeId, year, searchParams]);

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="bg-[#edf7fd] bg-cover min-h-screen lg:h-screen overflow-hidden flex flex-col lg:flex-row w-full text-[#3a4d8fe5]">
      <div className=" w-0 lg:w-1/5 z-5">
        <NavigationBar />
      </div>
      <div className="w-full lg:hidden h-14">
        <IoMenu
          onClick={() => setShowSideBar(true)}
          className={`flex lg:hidden h-8 w-8 ml-3 mt-2 text-[#3a4d8fe5] ${
            showSideBar ? "hidden" : ""
          }`}
        />
      </div>
      <Sidebar shown={showSideBar} close={() => setShowSideBar(!showSideBar)} />
      <section className="w-full lg:w-4/5 overflow-y-auto h-full">
        <h1 className="font-bold text-3xl m-3 text-[#3a4d8fe5]">
          Employee Details
        </h1>
        <div className="bg-white m-3 py-4 px-2 rounded-lg shadow-xl ">
          <p>Employee Name: {employee?.employee.name}</p>
          <p>Employee Phone Number: {employee?.employee.phoneNumber}</p>
          <p>
            Joining Date:{" "}
            {format(employee?.employee.joinDate ?? new Date(), "dd-MM-yyyy")}
          </p>
          <Link to={`/currentemployee/${employeeId}/salaryHistory`}>
            <button className="bg-[#3a4d8fe5] text-white py-1 px-3 mt-2 rounded-md">
              Salary History
            </button>
          </Link>
        </div>
        <div className="w-full flex justify-between">
          <Link
            to={`/companyemployees`}
            className="mx-3 font-semibold text-xl flex items-center"
          >
            <IoMdArrowBack className="w-8 h-8 mr-2" />
            Go Back
          </Link>
          <select
            className=" mr-3 bg-white p-2 rounded-lg text-2xl"
            onChange={(e) => setYear(Number(e.target.value))}
            value={year}
          >
            {Array.from(
              { length: 60 },
              (_, i) => new Date().getFullYear() - 29 + i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <h3 className="ml-3 text-xl font-bold text-[#3a4d8fe5]">
          Current Month
        </h3>
        <Link
          to={`/${employeeId}/attendanceDetail/${year}/${employee?.currentMonth.monthnumber}`}
        >
          <div className="bg-white m-3 p-2 rounded-lg shadow-md">
            <p className="text-lg font-semibold">
              {employee?.currentMonth.monthname}, {year}
            </p>
            <p>
              Total number of Days:{" "}
              {daysInMonth(
                employee?.currentMonth.monthnumber || new Date().getMonth() + 1,
                year
              )}
            </p>
            <p>Total Present Days: {employee?.currentMonth.presentdays}</p>
            <p>Total Absent Days: {employee?.currentMonth.absentdays}</p>
            <p>Total Half Days: {employee?.currentMonth.halfdays}</p>
            <p>Total Leave Days: {employee?.currentMonth.leavedays}</p>
            <p>Total Hours: {employee?.currentMonth.totalhours}</p>
            <p>Total Salary: {employee?.currentMonth.totalsalary}</p>
          </div>
        </Link>
        <div className="mb-10">
          <h3 className="ml-3 text-xl font-bold text-[#3a4d8fe5]">
            Other Months
          </h3>
          <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {employee?.otherMonths.map((month) => (
              <Link
                to={`/${employeeId}/attendanceDetail/${year}/${month.monthnumber}`}
                className="bg-white my-3 p-2 rounded-lg shadow-md"
                key={month.monthnumber}
              >
                <p className="text-lg font-semibold">
                  {month.monthname}, {year}
                </p>
                <p>
                  Total number of Days:{" "}
                  {daysInMonth(
                    month.monthnumber || new Date().getMonth() + 1,
                    year
                  )}
                </p>
                <p>Total Present Days: {month.presentdays}</p>
                <p>Total Absent Days: {month.absentdays}</p>
                <p>Total Half Days: {month.halfdays}</p>
                <p>Total Leave Days: {month.leavedays}</p>
                <p>Total Hours: {month.totalhours}</p>
                <p>Total Salary: {month.totalsalary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployeeDetails;
