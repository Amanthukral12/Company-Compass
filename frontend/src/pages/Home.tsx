import { UserAuth } from "../context/AuthProvider";

const Home = () => {
  const { company } = UserAuth();
  return (
    <div>
      {company?.name}
      Home
    </div>
  );
};

export default Home;
