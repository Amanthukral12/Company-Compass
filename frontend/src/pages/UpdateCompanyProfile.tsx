import { useEffect, useState } from "react";
import Sidebar from "../components/UI/Sidebar";
import { IoMenu } from "react-icons/io5";
import NavigationBar from "../components/UI/NavigationBar";
import { CiUser } from "react-icons/ci";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";

const UpdateCompanyProfile = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const { company, loading, updateCompanyData, fetchCompanyData } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    GST: "",
    Address: "",
  });

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name,
        GST: company.GST || "",
        Address: company.Address || "",
      });
    }
  }, [company]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCompanyData(formData);
    await fetchCompanyData();
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
      <section className="w-full lg:w-4/5 overflow-y-auto h-full mb-16 flex justify-center items-center">
        <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg py-6 flex flex-col items-center">
          <h1 className="font-bold text-3xl m-3  text-[#3a4d8fe5]">
            Update Company Porfile
          </h1>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-4/5 mx-auto relative mb-4">
              <CiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Company Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3a4d8fe5] focus:border-transparent outline-none transition text-base md:text-sm"
              />
            </div>
            <div className="w-4/5 mx-auto relative mb-4">
              <CiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="GST"
                name="GST"
                value={formData.GST}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3a4d8fe5] focus:border-transparent outline-none transition text-base md:text-sm"
              />
            </div>
            <div className="w-4/5 mx-auto relative mb-4">
              <CiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Address"
                name="Address"
                value={formData.Address}
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

export default UpdateCompanyProfile;
