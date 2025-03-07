import { useEffect, useState } from "react";
import { useSalaryHistory } from "../hooks/useSalaryHistory";
import { useNavigate, useParams } from "react-router-dom";
import NavigationBar from "../components/UI/NavigationBar";
import { FaMobileAlt } from "react-icons/fa";
import { format } from "date-fns";
import { FaDollarSign } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import Sidebar from "../components/UI/Sidebar";

const UpdateSalaryHistory = () => {
  const { updateSalaryHistory, fetchSalaryHistory } = useSalaryHistory();
  const [showSideBar, setShowSideBar] = useState(false);
  const [formData, setFormData] = useState({
    startDate: new Date(),
    endDate: new Date(),
    hourlyRate: 0,
  });

  const navigate = useNavigate();

  const { employeeId, salaryHistoryId } = useParams();

  useEffect(() => {
    const fetchSalaryHistoryDetails = async () => {
      try {
        const result = await fetchSalaryHistory(
          Number(employeeId),
          Number(salaryHistoryId)
        );
        if (result?.data.data.salaryHistory) {
          setFormData({
            startDate: result?.data.data.salaryHistory.startDate,
            endDate: result?.data.data.salaryHistory.endDate,
            hourlyRate: result?.data.data.salaryHistory.hourlyRate,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSalaryHistoryDetails();
  }, [employeeId, salaryHistoryId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === "startDate" || name === "endDate") {
      value = new Date(value).toISOString();
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSalaryHistory(
      Number(employeeId),
      Number(salaryHistoryId),
      formData
    );
    navigate(`/currentemployee/${employeeId}/salaryHistory/`);
  };
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
      <section className="w-full lg:w-4/5 overflow-y-auto h-full mb-16 flex justify-center items-center">
        <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg py-6 flex flex-col items-center">
          <h1 className="font-bold text-3xl m-3  text-[#3a4d8fe5]">
            Update Employee Salary History
          </h1>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-4/5 mx-auto relative mb-4">
              <FaMobileAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="date"
                placeholder="Start Date"
                name="startDate"
                value={format(formData.startDate, "yyyy-MM-dd")}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3a4d8fe5] focus:border-transparent outline-none transition text-base md:text-lg"
              />
            </div>
            <div className="w-4/5 mx-auto relative mb-4">
              <FaMobileAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="date"
                placeholder="End Date"
                name="endDate"
                value={format(
                  formData.endDate ? formData.endDate : new Date(),
                  "yyyy-MM-dd"
                )}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3a4d8fe5] focus:border-transparent outline-none transition text-base md:text-lg"
              />
            </div>
            <div className="w-4/5 mx-auto relative mb-4">
              <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Hourly Rate"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3a4d8fe5] focus:border-transparent outline-none transition text-base md:text-lg"
              />
            </div>
            <button className="w-3/5 mx-auto text-lg font-semibold text-white bg-[#3a4d8fe5] px-8 py-2 rounded-xl cursor-pointer block">
              Update
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UpdateSalaryHistory;
