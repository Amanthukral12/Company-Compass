import { useEffect } from "react";
/// <reference types="vite-plugin-svgr/client" />
import { useAuth } from "../hooks/useAuth";
import Person from "../assets/Person-svg.svg?react";
import NavigationBar from "../components/UI/NavigationBar";
import { useEmployee } from "../hooks/useEmployee";
import { SlScreenSmartphone } from "react-icons/sl";
import { FaTabletAlt } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";
import { parseUserAgent } from "../util/deviceInfo";
const Profile = () => {
  const { company, sessions, getAllSessions, loading, session } = useAuth();
  const { fetchAllEmployees, employees } = useEmployee();
  useEffect(() => {
    fetchAllEmployees();
  }, []);
  useEffect(() => {
    getAllSessions();
  }, []);
  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType.toLowerCase()) {
      case "mobile":
        return <SlScreenSmartphone className="w-4 h-4" />;
      case "tablet":
        return <FaTabletAlt className="w-4 h-4" />;
      default:
        return <MdMonitor className="w-4 h-4" />;
    }
  };
  if (loading) {
    return (
      <svg
        aria-hidden="true"
        className="w-16 h-16 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    );
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
        <div className="bg-white mx-3 rounded-lg shadow-xl p-4">
          <h3 className="text-lg font-semibold mb-4">Sessions</h3>
          <div className="space-y-3">
            {sessions?.map((singleSession) => {
              const deviceInfo = parseUserAgent(singleSession.deviceInfo || "");
              const isCurrentSession = singleSession.id === session?.id;
              return (
                <div
                  key={singleSession.id}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isCurrentSession
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="mr-3 text-gray-600">
                    {getDeviceIcon(deviceInfo.deviceType)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{deviceInfo.browser}</div>
                    <div className="text-sm text-gray-600">
                      {deviceInfo.os} • {deviceInfo.deviceType}
                    </div>
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

export default Profile;
