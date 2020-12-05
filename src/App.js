import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import './App.css';

import Profile from './components/profile';
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';
import CategoryTable from './components/category';
import CategoryForm from './components/categoryForm';
import ExpenseTable from './components/expenseTable';
import ExpenseForm from './components/expenseForm';
import SideNavBar from './components/sidenav/SideNavBar';
import Message from './components/message';
import ProtectedRoute from './route/ProtectedRoute';

import {
  faCheckSquare,
  faCoffee,
  faArrowDown,
  faArrowUp,
  faLongArrowAltDown,
  faLongArrowAltUp,
  faPalette,
  faMoneyBillWave,
  faCog,
  faPowerOff,
  faWallet,
  faAngleDoubleRight,
  faTag,
  faFileInvoice,
  faArrowRight,
  faTable,
  faHome,
  faEdit,
  faTrash,
  faCheckCircle,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { getUserDetails } from './state/action/userActions';
import { removeMessage } from './state/reducer/messageReducer';
import Report from './components/report';
import Chart from './components/charts';
// import Toast from './components/toast';

library.add(
  fab,
  faCheckSquare,
  faCoffee,
  faArrowDown,
  faArrowUp,
  faArrowRight,
  faLongArrowAltDown,
  faLongArrowAltUp,
  faPalette,
  faMoneyBillWave,
  faCog,
  faPowerOff,
  faWallet,
  faAngleDoubleRight,
  faTag,
  faFileInvoice,
  faTable,
  faHome,
  faEdit,
  faTrash,
  faCheckCircle,
  faUserCircle
);

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { message } = useSelector((state) => state);

  useEffect(() => {
    history.listen((location) => {
      dispatch(removeMessage());
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const { token } = JSON.parse(user);
      dispatch(getUserDetails(token));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Route
      render={({ location }) => (
        <>
          <SideNavBar location={location} history={history} />
          <main>
            {message.message && (
              <Message message={message.message} type={message.type} />
            )}
            <Switch>
              <ProtectedRoute path='/profile' component={Profile} />
              <ProtectedRoute exact path='/' component={Dashboard} />
              <ProtectedRoute path='/dashboard' component={Chart} />
              <ProtectedRoute
                exact
                path='/categories'
                component={CategoryTable}
              />
              <ProtectedRoute
                path='/categories/add'
                name='Add'
                component={CategoryForm}
              />
              <ProtectedRoute
                path='/categories/:categoryId'
                name='Update'
                component={CategoryForm}
              />
              <ProtectedRoute
                exact
                path='/transactions'
                component={ExpenseTable}
              />
              <ProtectedRoute
                path='/transactions/add'
                component={ExpenseForm}
              />
              <ProtectedRoute
                path='/transactions/:txnId'
                component={ExpenseForm}
              />
              <ProtectedRoute path='/reports' component={Report} />
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
              <Route path='*'> Error $404$. Page not found!</Route>
            </Switch>
          </main>
        </>
      )}
    />
  );
}

export default App;
