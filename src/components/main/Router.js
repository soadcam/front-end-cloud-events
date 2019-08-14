import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import LoginContainer from '../user/LoginContainer';
import UserRegisterContainer from '../user/RegisterContainer';
import history from '../../helpers/history';
import Logout from '../user/Logout';
import EventDetailsContainer from '../event/DetailContainer';
import EventAddContainer from '../event/AddContainer';
import EventListContainer from '../event/ListContainer';

const RouterCustom = () => (
      <Router history={history}>
        <div>
          <Route exact path='/' component={EventListContainer}/>
          <Route path='/login' component={LoginContainer}/>
          <Route path='/event/details/:eventId/:isReadonly' component={EventDetailsContainer}/>
          <Route path='/event/add' component={EventAddContainer}/>
          <Route path='/user/register' component={UserRegisterContainer}/>
          <Route path='/logout' component={Logout}/>
        </div>
    </Router>
  )

export default RouterCustom;
