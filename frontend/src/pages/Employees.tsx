/// <reference types="vite-plugin-svgr/client" />
import { useEffect } from "react";
import NavigationBar from "../components/UI/NavigationBar";
import { useEmployee } from "../hooks/useEmployee";
import { format } from "date-fns";
import { useAuth } from "../hooks/useAuth";
import Person from "../assets/Person-svg.svg?react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
const Employees = () => {
  const { loading, fetchAllEmployees, employees, deleteEmployee } =
    useEmployee();
  const { company } = useAuth();
  useEffect(() => {
    fetchAllEmployees();
  }, []);

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
    <div className="bg-[#edf7fd] bg-cover h-screen overflow-hidden flex w-full">
      <div className=" w-0 lg:w-1/5 z-5">
        <NavigationBar />
      </div>
      <section className="w-full">
        <div className="bg-white m-3 p-2 rounded-lg shadow-xl flex flex-col lg:flex-row">
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
              No of employees: {employees.length}
            </p>
          </div>
        </div>
        <div className="mx-3">
          <h2 className="text-2xl text-[#3a4d8fe5] font-semibold mb-4 mx-0 lg:mx-2">
            Employees List
          </h2>
          <div className="flex flex-col lg:flex-row">
            {employees.map((employee) => (
              <Link
                to={`/employee/${employee.id}`}
                key={employee.id}
                className="bg-white my-1 mx-0 lg:mx-2 lg:w-1/2 rounded-lg p-2 text-[#3a4d8fe5] font-medium shadow-md flex justify-between"
              >
                <div>
                  <p>Name: {employee.name}</p>
                  <p>Phone Number: {employee.phoneNumber}</p>
                  <p>Joining Date: {format(employee.joinDate, "dd-MM-yyyy")}</p>
                  <p>Status: {employee.status}</p>
                  <p>
                    HourlyRate:{" "}
                    {employee.salaryHistory.map(
                      (history) => history.hourlyRate
                    )}
                  </p>
                </div>
                <div className="flex mr-4 items-center">
                  <FaRegEdit className="text-2xl mx-2" />
                  <MdDelete
                    className="text-2xl mx-2"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      deleteHandler(employee.id);
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Employees;
