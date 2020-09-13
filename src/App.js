import React from 'react';
import logo from './logo.svg';
import './App.css';

import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';
import ExpenseTable from './components/expenseTable';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faCheckSquare,
  faCoffee,
  faArrowDown,
  faArrowUp,
  faLongArrowAltDown,
  faLongArrowAltUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(
  fab,
  faCheckSquare,
  faCoffee,
  faArrowDown,
  faArrowUp,
  faLongArrowAltDown,
  faLongArrowAltUp
);

function App() {
  return (
    <div className='App'>
      <h1>
        Welcom to Expense App!!! <FontAwesomeIcon icon='check-square' />
      </h1>
      <ExpenseTable />
      <Dashboard />
      <Register />
      <Login />
    </div>
  );
}

export default App;
