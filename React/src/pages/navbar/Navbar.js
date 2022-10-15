import React from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useState, useEffect } from 'react';
import { companyname } from '../../api/apiHandler'
import { logOutRedirectCall } from '../Common/RedirectPathMange';
import { Logoutapi } from '../../api/apiHandler';

export default function Navbar() {
  var [data, setData] = useState([]);
  const isLoggedIn = localStorage.MAisLogin;
  useEffect(() => {
    companyname().then((resposnse) => {
      if (resposnse.data.code == 1) {
        setData(resposnse.data)
      } else {
        console.log('data not found')
      }
    });
  }, []);

  function Logout() {
    Logoutapi().then((resposnse) => {
      if (resposnse.data.code == 1) {
        console.log(resposnse.data)

        logOutRedirectCall()
      } else {
        console.log(resposnse.data)
        console.log('data not found')
      }
    });
  }
  return (
    <>

      <Helmet>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />

        <style>{`
.navbar-nav{
    margin-left: auto !important;
}
.ab{
  padding-left : 700px;
}
.navbar-brand{
    font-size: 30px;
}
.name{
  margin-top: 12px;
  color : black !important;
}


  `}
        </style>
      </Helmet>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <Link to="/" ><img className="navbar-brand" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt='' style={{ width: 80, paddingLeft: 40 }} /></Link>
        <div className='name'>
          <h4>Apple</h4>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <form class="ab d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="bi bi-search" type="submit"></button>
          </form>
          <Link to='/' className='nav-item nav-link '><i className=""></i> ALL</Link>


          {data.data?.map((comapnyname, index) => {
            return (
              <Link key={index} to={`/filter/${comapnyname.id}`} className={`nav-item nav-link `}> {comapnyname.name}</Link>
              // <h6 className="navbar-nav ms-auto p-4 p-lg-0"> {comapnyname.name}</h6>
            )
          })}

{isLoggedIn
 ? <>
           <Link to='/cartdetails'><i class="bi bi-cart3 fa-3x "></i></Link>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle ml-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            User Profile
            </button>
            <ul class="dropdown-menu">
              <li><Link to="/editprofile" className="bi bi-pen ml-3 " >editprofile</Link></li>
              <li><Link to="/changepassword" className="bi bi-shield-lock ml-3 " >changepassword</Link></li>
              <li><Link to="/showprofile" className="bi bi-person ml-3" >showprofile</Link></li>
              <li> <button class="bi bi-door-closed ml-3" onClick={Logout}> Logout</button></li>
            </ul>
          </div>
         
          </>  
          :<> <Link to="/signup" className="nav-item nav-link" >Sign up</Link>
          <Link to="/login" className="nav-item nav-link" >Login</Link>
          </>}
         

         

        </div>

      </nav>
    </>
  )
}
