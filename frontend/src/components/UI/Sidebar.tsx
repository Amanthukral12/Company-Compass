import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosPeople, IoMdPerson } from "react-icons/io";
import ProfilePopup from "./ProfilePopup";
import Logo from "../../assets/Employee.svg?react";
const Sidebar = ({ shown, close }: { shown: boolean; close: () => void }) => {
  const { company } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  return shown ? (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-[#00000066] z-[2]"
      onClick={() => close()}
    >
      <div
        className="bg-[#D9D9D9] absolute top-0 left-0 w-3/5 min-h-[98vh] p-2 rounded-lg flex flex-col items-center backdrop:blur-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col justify-center items-center my-7">
          <Logo className="w-1/2 rounded-3xl " />
          <h1 className="text-lg lg:text-2xl mt-4 font-bold text-[#3a4d8fe5]">
            Company Compass
          </h1>
        </div>
        <hr className="w-[90%] border-t-2 border-[#3a4d8fe5] mb-4" />
        <NavLink
          className={({ isActive }) =>
            `p-2.5 w-[90%] text-lg  font-bold flex items-center mb-1 ${
              isActive
                ? "bg-[#3a4c8fe5] !text-white rounded-2xl !shadow-2xl"
                : ""
            }`
          }
          to="/"
        >
          <FaHome className="h-8 w-8 mr-2.5" />
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `p-2.5 w-[90%] text-lg  font-bold flex items-center mb-1 ${
              isActive
                ? "bg-[#3a4c8fe5] !text-white rounded-2xl !shadow-2xl"
                : ""
            }`
          }
          to="/companyemployees"
        >
          <IoIosPeople className="h-8 w-8 mr-2.5" />
          Employees
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `p-2.5 w-[90%] text-lg  font-bold flex items-center mb-1 ${
              isActive
                ? "bg-[#3a4c8fe5] !text-white rounded-2xl !shadow-2xl"
                : ""
            }`
          }
          to="/profile"
        >
          <IoMdPerson className="h-8 w-8 mr-2.5" />
          Profile
        </NavLink>
        <div
          className="flex items-center mt-auto mr-auto mb-4"
          onClick={() => setShowPopup(!showPopup)}
        >
          <img
            src={company?.avatar || undefined}
            className="rounded-full h-12 w-12"
            alt=""
          />
          <h2 className="text-md text-[#3a4d8fe5] font-bold cursor-pointer">
            {company?.name}
          </h2>
          <ProfilePopup
            shown={showPopup}
            close={() => setShowPopup(!showPopup)}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default Sidebar;
