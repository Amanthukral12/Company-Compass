import { UserAuth } from "../context/AuthProvider";

const Profile = () => {
  const { company } = UserAuth();
  return <div>{company?.name}</div>;
};

export default Profile;
