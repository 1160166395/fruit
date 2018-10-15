import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';

import Home from './component/Home';
import Deitails from './component/Deitails';
import NotFound from './component/NotFound';
import Login from './component/Login';
import searchList from './component/searchList';

import 'antd-mobile/dist/antd-mobile.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/deitails' component={Deitails}/>
        <Route path='/login' component={Login}/>
        <Route path='/searchlist' component={searchList}/>
        <Route path='\/' component={Home} eaxct/>
        <Route component={NotFound}/>
      </Switch>
    );
  }
}

export default App;
