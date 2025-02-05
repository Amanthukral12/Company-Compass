import { UserAuth } from "../context/AuthProvider";

const Login = () => {
  const { login } = UserAuth();

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
