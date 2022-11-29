import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '@material-ui/core/Input';

import { useTokenStore } from '../store';
import Button from '../components/Button';

const LoginPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const [checkClick, setCheckClick] = useState(false);

  const [email, setEmail] = useState('');

  const handleShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const error = useTokenStore((state) => state.error);
  const loading = useTokenStore((state) => state.loading);
  const fetchLogin = useTokenStore((state) => state.fetchLogin);

  useEffect(() => {
    if (!loading) {
      navigate('/');
    }
    if (error !== null) {
      toast.error('email or password is incorrect');
    }
  }, [checkClick]);

  const handleClick = async (e) => {
    e.preventDefault();
    const { password } = values;

    await fetchLogin(email, password);
    setCheckClick(!checkClick);
  };

  return (
    <div className="w-full h-screen gradient-login-page flex justify-center items-center">
      <div className="bg-login-page bg-green-400/30 bg-blend-overlay bg-cover w-full sm:w-1/2 md:w-9/12 lg:w-1/2 shadow-md flex flex-col md:flex-row items-center mx-5 sm:m-0 rounded">
        <div className="w-full md:w-1/2 hidden md:flex flex-col justify-center items-center text-white">
          <p className="text-3xl"> Welcome to</p>
          <h1 className="text-5xl font-bold">
            WEED END
          </h1>
          <p>admin dashboard</p>
        </div>
        <div className="bg-white w-full md:w-1/2 flex flex-col items-center py-32 px-8">
          <h2 className="text-3xl my-4">LOGIN</h2>
          <form className="w-full">
            <div className="mb-4">
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md border placeholder-gray-400 focus:outline-none focus:border-palm-leaf"
              />
            </div>
            <div className="mb-4">
              <Input
                disableUnderline
                type={values.showPassword ? 'text' : 'password'}
                onChange={handleChange('password')}
                value={values.password}
                placeholder="password"
                className="w-full p-3 rounded-md border placeholder-gray-400 focus:outline-none focus:border-palm-leaf "
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDown}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )}
              />
            </div>
            <ToastContainer />
            <div className="mb-4">
              <Button btnName="Login" classStyles="w-full font-semibold  px-5 py-3 button-hover border" handleClick={handleClick} />
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default LoginPage;
