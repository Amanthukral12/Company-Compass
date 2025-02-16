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
import Loading from "../components/Loading";
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
