import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useEmployee } from "../hooks/useEmployee";
import { useAuth } from "../hooks/useAuth";
import NavigationBar from "../components/UI/NavigationBar";

const Home = () => {
  const { company } = useAuth();
  const { fetchAllEmployees, employees } = useEmployee();
  useEffect(() => {
    fetchAllEmployees();
  }, []);
  return (
    <div className="bg-[#cae9ff] bg-cover h-screen overflow-hidden flex">
      <div className="w-1/5 z-5">
        <NavigationBar />
      </div>
      {company?.name}
      Home
      <Link to="/profile">Profile</Link>
      <div>
        {employees?.map((employee) => (
          <div key={employee.id}>{employee.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Home;
