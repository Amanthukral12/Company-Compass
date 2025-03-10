/// <reference types="vite-plugin-svgr/client" />
import { useEffect, useState } from "react";
import NavigationBar from "../components/UI/NavigationBar";
import { useEmployee } from "../hooks/useEmployee";
import { format } from "date-fns";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { IoMenu } from "react-icons/io5";
import Sidebar from "../components/UI/Sidebar";
import CompanyHeader from "../components/UI/CompanyHeader";
const Employees = () => {
  const { loading, fetchAllEmployees, employees, deleteEmployee } =
    useEmployee();
  const [showSideBar, setShowSideBar] = useState(false);
  const year = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const navigate = useNavigate();

  const deleteHandler = async (id: number) => {
    try {
      await deleteEmployee(id);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="bg-[#edf7fd] bg-cover h-screen overflow-hidden flex flex-col lg:flex-row w-full text-[#3a4d8fe5]">
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
      <section className="w-full lg:w-4/5 overflow-y-auto h-full mb-16">
        <CompanyHeader />
        <div className="mx-3">
          <div className="flex justify-between mb-4 mx-0 lg:mx-2">
            <h2 className="text-2xl text-[#3a4d8fe5] font-semibold ">
              Employees List
            </h2>
            <Link to={"/companyemployee/add"}>
              <button className="text-lg font-semibold text-white bg-[#3a4d8fe5] px-8 py-1 rounded-xl cursor-pointer">
                Add New Employee
              </button>
            </Link>
          </div>
          <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {employees.map((employee) => (
              <Link
                to={{
                  pathname: `/currentemployee/${employee.id}`,
                  search: `?currentYear=${new Date().getFullYear()}`,
                }}
                key={employee.id}
                className="bg-white my-1 rounded-lg p-2 text-[#3a4d8fe5] font-medium shadow-md flex flex-col justify-between"
              >
                <div className="flex w-full justify-between">
                  <div>
                    <p>Name: {employee.name}</p>
                    <p>Phone Number: {employee.phoneNumber}</p>
                    <p>
                      Joining Date: {format(employee.joinDate, "dd-MM-yyyy")}
                    </p>
                    <p>Status: {employee.status}</p>
                    <p>
                      HourlyRate:{" "}
                      {employee.salaryHistory?.length
                        ? employee.salaryHistory.map(
                            (history) => history.hourlyRate
                          )
                        : "0"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaRegEdit
                      className="text-2xl mx-2"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(`/currentemployee/update/${employee.id}`);
                      }}
                    />
                    <MdDelete
                      className="text-2xl mx-2"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteHandler(employee.id);
                      }}
                    />
                  </div>
                </div>

                <button
                  className="text-lg font-semibold text-white bg-[#3a4d8fe5] w-full lg:w-4/5 px-4 py-1 my-2 mx-auto rounded-xl cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate(
                      `/${employee.id}/attendanceDetail/${year}/${currentMonth}`
                    );
                  }}
                >
                  Add Current Month Attendance
                </button>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Employees;
