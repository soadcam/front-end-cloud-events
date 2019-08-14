import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import EventDetails from '../event/Detail';
import EventList from '../event/List';
import EventAdd from '../event/Add';
import LoginContainer from '../user/LoginContainer';
import UserRegisterContainer from '../user/RegisterContainer';
import history from '../../helpers/history';

const Router = () => (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path='/' component={EventList}/>
        <Route path='/login' component={LoginContainer}/>
        <Route path='/event/details/:idEvent' component={EventDetails}/>
        <Route path='/event/add' component={EventAdd}/>
        <Route path='/user/register' component={UserRegisterContainer}/>
      </Switch>
    </BrowserRouter>
  )

export default Router;
