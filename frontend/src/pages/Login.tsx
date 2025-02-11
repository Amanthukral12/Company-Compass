import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();

  const onSubmit = async () => {
    try {
      await login();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={() => onSubmit()}>Login with google</button>
    </div>
  );
};

export default Login;
