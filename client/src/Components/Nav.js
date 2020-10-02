import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import defaultImg from '../assets/img.png';

import style from './Nav.module.css';

const Nav = ({ user: { id, photo, name } }) => {
  const [dropdown, setDropdown] = useState(false);
  const [logout, setLogout] = useState(false);

  const history = useHistory();

  const handleDropdown = (e) => {
    e.preventDefault();

    setDropdown(!dropdown);
  };

  useEffect(() => {
    axios
      .post(`https://auth-app.herokuapp.com/api/auth/logout`)
      .then((res) => {
        console.log('logged out');
      });
  }, [logout]);

  const handleLogout = (e) => {
    e.preventDefault();

    setLogout(true);
    history.push('/register');
  };

  return (
    <nav className={style.navContainer}>
      <div className={style.nav}>
        <div className='nav-brand'></div>
        <div className={style.navControls}>
          <div className={style.navUser}>
            <img src={photo ? photo : defaultImg} alt='user' />
            <p>{name}</p>
            <button className={style.arrow} onClick={handleDropdown}>
              {dropdown ? <span>&#8593;</span> : <span>&#8595;</span>}
            </button>

            {dropdown ? (
              <div className={style.dropdown}>
                <Link className={style.dropdownLink} to={`/user/${id}`}>
                  View Profile
                </Link>
                <Link className={style.dropdownLink} to={`/user/${id}`}>
                  Group Chat
                </Link>
                <div className={style.horizontalRule}></div>
                <button onClick={handleLogout} className={style.dropdownLink}>
                  Logout
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
