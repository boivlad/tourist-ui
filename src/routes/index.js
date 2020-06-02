import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import App from '../App';
import { Login, NotFound, Registration } from '../pages';
import PrivateRouter from './PrivateRoute';
import Hotels from '../pages/Hotels';

const AppRouter = () => (
  <Router>
    <App>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/registration" component={Registration}/>
        <PrivateRouter exact path="/hotels" component={Hotels} redirect="/login"/>
        <Redirect exact from='/' to="/hotels"/>
        <Route path="" component={NotFound}/>
      </Switch>
    </App>
  </Router>
);
export default AppRouter;
