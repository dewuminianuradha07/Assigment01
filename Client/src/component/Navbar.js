import React from 'react'
import Logo from '../images/logo.png'
import {Link} from 'react-router-dom'
import '../style/Navbar.css'
function Navbar() {
  return (
    <div className='navbar'>
        <div className='leftside'></div>
        <img src={Logo}/>
        <div className='rightside'></div>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
        <Link to = "/login">
        <button className='login'>LOG IN</button>
        </Link>
        <Link to = "/signup">
        <button className='signup'>SIGN UP</button>
        </Link>
   </div>
  
   
  
  );
}

export default Navbar;