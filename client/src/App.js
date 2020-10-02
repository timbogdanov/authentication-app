import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Register from './Components/Register';
import Profile from './Components/Profile';

const App = () => {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/user/:id' component={Profile} />
        <Route exact path='/' component={Register} />
        {/* <Route exact path='/login' component={Login} /> */}
      </Switch>
    </div>
  );
};

export default App;
