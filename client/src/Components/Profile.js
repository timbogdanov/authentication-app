import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Nav from './Nav';
import style from './Profile.module.css';

const Profile = (props) => {
  const [user, setUser] = useState({});
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    axios
      .get(`https://auth-app.herokuapp.com/api/users/${props.match.params.id}`)
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .put(
        `https://auth-app.herokuapp.com/api/users/${props.match.params.id}`,
        user
      )
      .then((res) => {
        setCurrentUser(res.data);
      });
  }, [currentUser]);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentUser(user);
  };

  return (
    <>
      <Nav user={user} />

      <div className={style.profileContainer}>
        <div className={style.profile}>
          <div className={style.profileHeader}>
            <h1>Personal info</h1>
            <p>Basic info, like your name and photo</p>
          </div>
          <div className={style.formContainer}>
            <form>
              <div className={style.inputContainer}>
                <label htmlFor='photo'>Photo</label>
                <input
                  type='text'
                  id='photo'
                  name='photo'
                  value={user.photo}
                  onChange={handleInputChange}
                  placeholder='Link for profile image'
                />
              </div>
              <div className={style.inputContainer}>
                <label htmlFor='name'>Full Name</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={user.name}
                  onChange={handleInputChange}
                  placeholder='Full Name'
                />
              </div>

              <div className={style.inputContainer}>
                <label htmlFor='bio'>Bio</label>
                <input
                  type='text'
                  id='bio'
                  name='bio'
                  value={user.bio}
                  onChange={handleInputChange}
                  placeholder='Bio'
                />
              </div>

              <div className={style.inputContainer}>
                <label htmlFor='email'>Email</label>
                <input
                  type='text'
                  id='email'
                  name='email'
                  value={user.email}
                  onChange={handleInputChange}
                  placeholder='Email'
                />
              </div>

              <div className={style.inputContainer}>
                <label htmlFor='phone'>Phone</label>
                <input
                  type='phone'
                  id='phone'
                  name='phone'
                  value={user.phone}
                  onChange={handleInputChange}
                  placeholder='Phone'
                />
              </div>

              <div className={style.submitContainer}>
                <button onClick={handleSubmit} className={style.submitProfile}>
                  Save <span className={style.loadingAnimation}>&#8594;</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
