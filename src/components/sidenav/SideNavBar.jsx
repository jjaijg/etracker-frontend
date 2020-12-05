import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './SideNavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../state/reducer/userReducer';

const SideNavBar = ({ location, history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  return (
    <nav className='sidenav'>
      <ul className='sidenav-nav'>
        <li className='brand-logo'>
          <span className='sidenav-link'>
            <span className='sidenav-link-text'>MTracker</span>
            <FontAwesomeIcon
              size='2x'
              icon='angle-double-right'
              className='nav-icon'
            />
          </span>
        </li>
        <li className='sidenav-item'>
          <Link to='/' className='sidenav-link'>
            <FontAwesomeIcon size='lg' icon='home' className='nav-icon' />
            <span className='sidenav-link-text'>Home</span>
          </Link>
        </li>
        <li className='sidenav-item'>
          <Link to='/dashboard' className='sidenav-link'>
            <FontAwesomeIcon size='lg' icon='palette' className='nav-icon' />
            <span className='sidenav-link-text'>Dashboard</span>
          </Link>
        </li>
        <li className='sidenav-item'>
          <span className='sidenav-link'>
            <FontAwesomeIcon
              size='lg'
              icon='money-bill-wave'
              className='nav-icon'
            />
            <span className='sidenav-link-text'>Transactions</span>
          </span>
          <span className='sidenav-sub-item'>
            <Link to='/transactions' className='sidenav-link'>
              <FontAwesomeIcon
                size='lg'
                icon='arrow-right'
                className='nav-icon'
              />
              <span className='sidenav-link-text'>View Tranasctions</span>
            </Link>
            <Link to='/transactions/add' className='sidenav-link'>
              <FontAwesomeIcon
                size='lg'
                icon='arrow-right'
                className='nav-icon'
              />
              <span className='sidenav-link-text'>Add Transaction</span>
            </Link>
          </span>
        </li>
        <li className='sidenav-item'>
          <span className='sidenav-link'>
            <FontAwesomeIcon size='lg' icon='table' className='nav-icon' />
            <span className='sidenav-link-text'>Category</span>
          </span>
          <span className='sidenav-sub-item'>
            <Link to='/categories' className='sidenav-link'>
              <FontAwesomeIcon
                size='lg'
                icon='arrow-right'
                className='nav-icon'
              />
              <span className='sidenav-link-text'>View Categories</span>
            </Link>
            <Link to='/categories/add' className='sidenav-link'>
              <FontAwesomeIcon
                size='lg'
                icon='arrow-right'
                className='nav-icon'
              />
              <span className='sidenav-link-text'>Add Category</span>
            </Link>
          </span>
        </li>
        <li className='sidenav-item'>
          <Link to='/reports' className='sidenav-link'>
            <FontAwesomeIcon
              size='lg'
              icon='file-invoice'
              className='nav-icon'
            />
            <span className='sidenav-link-text'>Reports</span>
          </Link>
        </li>
        {user ? (
          <li
            className='sidenav-item sidenav-link'
            onClick={() => dispatch(logoutUser())}
          >
            <FontAwesomeIcon size='lg' icon='cog' className='nav-icon' />
            <span className='sidenav-link-text'>Logout</span>
          </li>
        ) : (
          <li className='sidenav-item'>
            <Link to='/login' className='sidenav-link'>
              <FontAwesomeIcon size='lg' icon='cog' className='nav-icon' />
              <span className='sidenav-link-text'>Login</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SideNavBar;
