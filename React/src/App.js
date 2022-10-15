import './App.css';
import { Route, Routes,useLocation } from "react-router-dom";
import Home from './pages/Home/Home';
import RedirectBlankPage from './pages/Common/RedirectBlankPage';
import RedirectBlankPageHome from './pages/Common/RedirectBlankPageHome';
import Login from './pages/Login/Login';
import Signup from './pages/Sign/Signup';
import Cp from './pages/ChagePassword/Cp';
import Navbar from './pages/navbar/Navbar';
import Editprofile from './pages/editprofile/Editprofile';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import CartDetails from './pages/cartdetails/Cartdetails';
import Showprofile from './pages/showprofile/Showprofile';
import Filter from './pages/Filter/Filter';

function App() {
  const location = useLocation();


  var some_path = true;
  if( location.pathname == '/signup' || location.pathname == '/login'  || location.pathname == '/forgotpassword' ){
    some_path = false;
  }

  const getFlow = () => {
    if (!localStorage.getItem("MAisLogin", false)) {
      return (
        <>
        {some_path ? <Navbar /> : ""}
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="*" element={<RedirectBlankPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/" element={<Home />} />
          <Route path="/filter/:company_id" element={<Filter />} />
          </Routes>
        </>
      )
    }
    else {
      return (
        <>
        {some_path ? <Navbar /> : ""}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/changepassword" element={<Cp/>} />
            <Route path="/editprofile" element={<Editprofile/>} />
            <Route path="/forgotpassword" element={<ForgotPassword/>} />
            <Route path='/cartdetails' element={<CartDetails/>} />
            <Route path='/showprofile' element={<Showprofile/>} />
            <Route path="/filter/:company_id" element={<Filter />} />
            <Route path="*" element={<RedirectBlankPageHome />} />
          </Routes>
        </>
      )
    }
  }

  return (
    <>
      {getFlow()}
    </>
  );
}

export default App;
