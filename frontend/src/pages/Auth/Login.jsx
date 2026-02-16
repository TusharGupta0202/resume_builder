import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Login = ({setCurrentPage}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN , {
        email,
        password
      });

      const {token }= response.data;
      if(token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };


  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>
        Welcome Back
      </h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Please Enter your details to log in
      </p>
      <form onSubmit={handleLogin}>

        <Input 
          type='email'
          label='Email address'
          placeholder='jp@example.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input 
          type='password'
          label='Password'
          placeholder='minimum 8 characters'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />


        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button type='submit' className='btn-primary'>Login</button>

        <p className='text-[13px] text-slate-800 mt-3'>
          Don't have an account?{" "}
          <button
            type='button'
            className='font-medium underline cursor-pointer text-primary'
            onClick={() => setCurrentPage("signup")}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login