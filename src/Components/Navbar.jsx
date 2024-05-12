import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authSlice, { authActions } from '../Redux/store/auth-slice';
import {Link} from 'react-router-dom'
import Login from './Login';
import SignUp from './SignUp';
import trainImage from '../assets/Circle-icons-train.png';

const Navbar = () => {
  
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  const user = useSelector(state=>state.user.user);
  const dispatch = useDispatch();
  console.log(isLoggedIn);
  const handleLogout =()=>{
    dispatch(authActions.logout());
  }
  return (
    <div className="container">
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div className="col-md-3 mb-2 mb-md-0">
        <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
          <img src={trainImage} alt=""  style={{width:'70%'}}/>
        </a>
      </div>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><Link to='/trainTicket' className="nav-link px-2 link-secondary">Train Tickets</Link></li>
        <li><a href="#" className="nav-link px-2">Bus Booking</a></li>
        <li><a href="#" className="nav-link px-2">Food On Train</a></li>
        <li><Link to="/trainSearch" className="nav-link px-2">Train Information</Link></li>
        <li><Link to="/live" className="nav-link px-2">Live Location</Link></li>
        
      </ul>

      <div className="col-md-3 text-end">
          {isLoggedIn ? (<>
            <p>Welcome {user.username}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
          ) : (
            <Link to="/login">
              <button type="button" className="btn btn-outline-primary me-2">Login</button>
            </Link>
          )}
          {!isLoggedIn && <Link to="/signup">
            <button type="button" className="btn btn-primary">Sign-up</button>
          </Link> 
          }
         
        </div>
    </header>
  </div>
   
  )
}

export default Navbar
