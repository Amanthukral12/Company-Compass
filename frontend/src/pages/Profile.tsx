import { useEffect, useState } from "react";
/// <reference types="vite-plugin-svgr/client" />
import { useAuth } from "../hooks/useAuth";
import NavigationBar from "../components/UI/NavigationBar";
import { SlScreenSmartphone } from "react-icons/sl";
import { FaTabletAlt } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";
import { parseUserAgent } from "../utils/deviceInfo";
import Loading from "../components/Loading";
import Sidebar from "../components/UI/Sidebar";
import { IoMenu } from "react-icons/io5";
import CompanyHeader from "../components/UI/CompanyHeader";
const Profile = () => {
  const { sessions, getAllSessions, loading, session } = useAuth();
  const [showSideBar, setShowSideBar] = useState(false);
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
