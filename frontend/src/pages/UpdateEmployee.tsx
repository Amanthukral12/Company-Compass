import { useEffect, useState } from "react";
import NavigationBar from "../components/UI/NavigationBar";
import { useEmployee } from "../hooks/useEmployee";
import { CiUser } from "react-icons/ci";
import { FaMobileAlt } from "react-icons/fa";
import { format } from "date-fns";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import Sidebar from "../components/UI/Sidebar";
const UpdateEmployee = () => {
  const { updateEmployee, fetchEmployee } = useEmployee();
  const [showSideBar, setShowSideBar] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    joinDate: new Date(),
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();

  const { employeeId } = useParams();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        searchParams.set("currentYear", currentYear.toString());
        setSearchParams(searchParams);
        const result = await fetchEmployee(
          Number(employeeId),
          Number(currentYear)
        );

        if (result?.data.data.employee) {
          setFormData({
            name: result?.data.data.employee.name,
            phoneNumber: result?.data.data.employee.phoneNumber,
            joinDate: result?.data.data.employee.joinDate,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployeeDetails();
  }, [employeeId, currentYear, searchParams, fetchEmployee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === "joinDate") {
      value = new Date(value).toISOString();
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateEmployee(formData, Number(employeeId));
    navigate("/companyemployees");
  };

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
      <section className="w-full lg:w-4/5 overflow-y-auto h-full mb-16 flex justify-center items-center">
        <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg py-6 flex flex-col items-center">
          <h1 className="font-bold text-3xl m-3  text-[#3a4d8fe5]">
            Update Employee
          </h1>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-4/5 mx-auto relative mb-4">
              <CiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Employee Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3a4d8fe5] focus:border-transparent outline-none transition text-base md:text-sm"
              />
            </div>
            <div className="w-4/5 mx-auto relative mb-4">
              <FaMobileAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Employee phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3a4d8fe5] focus:border-transparent outline-none transition text-base md:text-sm"
              />
            </div>
            <div className="w-4/5 mx-auto relative mb-4">
              <FaMobileAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="date"
                placeholder="Employee phoneNumber"
                name="joinDate"
                value={format(formData.joinDate, "yyyy-MM-dd")}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3a4d8fe5] focus:border-transparent outline-none transition text-base md:text-sm"
              />
            </div>
            <button className="w-4/5 mx-auto text-lg font-semibold text-white bg-[#3a4d8fe5] px-8 py-1 rounded-xl cursor-pointer block">
              Update
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UpdateEmployee;
