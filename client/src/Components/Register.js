import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import style from './Register.module.css';

const initialValues = {
  name: '',
  phone: '',
  email: '',
  password: '',
};

const Register = (props) => {
  const [passwordVisible, setPasswordVisibility] = useState(false);
  const [userInput, setUserInput] = useState(initialValues);
  const history = useHistory();

  const handleVisibility = (e) => {
    e.preventDefault();

    setPasswordVisibility(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('https://auth-app.herokuapp.com/api/auth/register', userInput)
      .then((data) => {
        console.log(data);
        const id = data.data.id;
        history.push(`/user/${id}`);
      });
  };

  const handleInputChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  return (
    <div className={style.registerContainer}>
      <form className={style.form}>
        {/* name, phone, email, password required */}
        <div>
          <label htmlFor='name'>Full Name</label>
          <input
            type='text'
            placeholder='Full Name'
            id='name'
            name='name'
            value={userInput.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor='name'>Phone</label>
          <input
            type='text'
            placeholder='Phone'
            id='phone'
            name='phone'
            value={userInput.phone}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            placeholder='Email'
            id='email'
            name='email'
            value={userInput.email}
            onChange={handleInputChange}
          />
        </div>

        <div className={style.togglePassword}>
          <div>
            <label htmlFor='password'>Password</label>
            <div className={style.inputFormat}>
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder='Password'
                name='password'
                value={userInput.password}
                onChange={handleInputChange}
              />
              <button onClick={handleVisibility}>
                {passwordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
        </div>

        <button className={style.registerButton} onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
