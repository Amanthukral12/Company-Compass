import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useEmployee } from "../hooks/useEmployee";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { company, logout } = useAuth();
  const { fetchAllEmployees, employees } = useEmployee();
  useEffect(() => {
    fetchAllEmployees();
  }, []);
  return (
    <div>
      {company?.name}
      Home
      <Link to="/profile">Profile</Link>
      <button onClick={logout}>Logout</button>
      <div>
        {employees?.map((employee) => (
          <div key={employee.id}>{employee.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Home;
