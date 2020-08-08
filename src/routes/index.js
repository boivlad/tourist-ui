import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import App from '../App';
// import PrivateRouter from './PrivateRoute';
import {
  Hotel, HotelsList, Login, NotFound, Registration, Tour, TourList, Transfer, TransferList,
} from '../pages';

const AppRouter = () => (
  <Router>
    <App>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/registration" component={Registration}/>
        <Route path="/hotels">
          <Route exact path="/hotels" component={HotelsList}/>
          <Route path="/hotels/:id" component={Hotel}/>
        </Route>
        <Route path="/tours">
           <Route exact path="/tours" component={TourList}/>
          <Route path="/tours/:id" component={Tour}/>
        </Route><Route path="/transfers">
           <Route exact path="/transfers" component={TransferList}/>
          <Route path="/transfers/:id" component={Transfer}/>
        </Route>
        {/* <PrivateRouter exact path="/admin" component={AdminPanel} redirect="/login"/> */}
        <Redirect exact from='/' to="/hotels"/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </App>
  </Router>
);
export default AppRouter;
