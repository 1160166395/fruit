import React, { Component } from 'react';
import './App.css';
import Home from './component/Home';
import Deitails from './component/Deitails';
import NotFound from './component/NotFound';
import {Switch,Route} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Switch>
        <Route to='/home' component={Home}/>
        <Route to='/deitails' component={Deitails}/>
        <Route component={NotFound}/>
      </Switch>
    );
  }
}

export default App;
