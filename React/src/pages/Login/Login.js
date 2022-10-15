import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import { Loginapi } from '../../api/apiHandler'
import {loginRedirectCallWithDataStore} from "../../pages/Common/RedirectPathMange"

export default function Login() {

    let [data, setData] = useState({
        email: "",
        password: ""
    });

   // let [apidata, setapiData] = useState()

    let eventdata = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    }


    const Clickfunc = () => {
        // make axios post request
        console.log(data.email)
        Loginapi({ "email": data.email, "password": data.password }).then((resposnse) => {
            if (resposnse.data.code == 1) {
                console.log(resposnse.data)
                alert(resposnse.data.message);
                loginRedirectCallWithDataStore(resposnse.data.data)
            } else {
                console.log('data not found')
                console.log(resposnse.data)
                alert(resposnse.data.message);
            }
        });
    }

    return (
        

<>
<div className="page-content" style={{ backgroundImage : "url(" + "https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" + ")",backgroundSize: 'cover' }} >
     <div className="form-v7-content">
     
         <div className="form-detail" >
             <div className='text-center'><h2>Login</h2></div>
             
             <div className="form-row">
                 <label htmlFor="your_email">E-MAIL</label>
                 <input type="text" id="your_email" className="input-text" name="email"  onChange={eventdata}/>


             </div>
             <div className="form-row">
                 <label htmlFor="password">PASSWORD</label>
                 <input type="password"  id="password" className="input-text" name="password"  onChange={eventdata}/>
             </div>

             <button className="text-center btn btn-primary"  onClick={() => Clickfunc()}> Login</button>
                     
             <div className=" form-rowtext-center my-2">
                     <Link to="/signup" className="txt1" style={{color: "black"}}>
                   Create account
                         </Link>
                     </div>
                     <div className=" form-rowtext-center my-2">
                     <Link to={"/forgotpassword"} className="txt1" style={{color: "black"}}>
                     Forgot Password
                         </Link>
                     </div>
         </div>
     </div>
 </div>

             
 </>
    )
}
