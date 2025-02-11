import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { company } = useAuth();
  return <div>{company?.name}</div>;
};

export default Profile;
