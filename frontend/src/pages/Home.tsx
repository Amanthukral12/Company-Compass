import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthProvider";

import { useEffect } from "react";
import { useEmployee } from "../hooks/useEmployee";

const Home = () => {
  const { company } = UserAuth();
  const { fetchAllEmployees, employees } = useEmployee();
  useEffect(() => {
    fetchAllEmployees();
  }, []);
  return (
    <div>
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
