import { format } from "date-fns";
import NavigationBar from "../components/UI/NavigationBar";
import { useEmployee } from "../hooks/useEmployee";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { useSalaryHistory } from "../hooks/useSalaryHistory";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const SalaryHistory = () => {
  const { employeeId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchEmployee, employee, loading } = useEmployee();
  const { fetchSalaryHistories, salaryHistories, deleteSalaryHistory } =
    useSalaryHistory();

  const year = new Date().getFullYear();

  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchEmployeeSalaryHistory = async () => {
      try {
        await fetchSalaryHistories(Number(employeeId));
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployeeSalaryHistory();
  }, []);

  const deleteHandler = async (id: number) => {
    try {
      await deleteSalaryHistory(Number(employeeId), Number(id));
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
    <div className="bg-[#edf7fd] bg-cover h-screen overflow-hidden flex w-full text-[#3a4d8fe5]">
      <div className=" w-0 lg:w-1/5 z-5">
        <NavigationBar />
      </div>
      <section className="w-full lg:w-4/5 overflow-y-auto h-full mb-16">
        <h1 className="font-bold text-3xl m-3 text-[#3a4d8fe5]">
          Employee Details
        </h1>
        <div className="bg-white m-3 p-2 rounded-lg ">
          <p>Employee Name: {employee?.employee.name}</p>
          <p>Employee Phone Number: {employee?.employee.phoneNumber}</p>
          <p>
            Joining Date:{" "}
            {format(employee?.employee.joinDate ?? new Date(), "dd-MM-yyyy")}
          </p>
        </div>
        <div className="mx-3">
          <h2 className="text-2xl text-[#3a4d8fe5] font-semibold ">
            Salary History
          </h2>
          <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {salaryHistories.map((salaryHistory) => (
              <div
                key={salaryHistory.id}
                className="bg-white my-1 rounded-lg p-2 text-[#3a4d8fe5] font-medium shadow-md flex justify-between"
              >
                <div>
                  <p>
                    Start Date:{" "}
                    {format(
                      salaryHistory.startDate ?? new Date(),
                      "dd-MM-yyyy"
                    )}
                  </p>
                  <p>
                    End Date:{" "}
                    {salaryHistory.endDate
                      ? format(salaryHistory.endDate, "dd-MM-yyyy")
                      : "Present"}
                  </p>
                  <p>Hourly Rate: {salaryHistory.hourlyRate}</p>
                </div>
                <div className="flex mr-4 items-center">
                  <FaRegEdit
                    className="text-2xl mx-2"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(
                        `/currentemployee/${employeeId}/salaryHistory/update/${salaryHistory.id}`
                      );
                    }}
                  />
                  <MdDelete
                    className="text-2xl mx-2"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteHandler(salaryHistory.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SalaryHistory;
