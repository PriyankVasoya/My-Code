import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useFormInputValidation } from 'react-form-input-validation'

import { loginRedirectCallWithDataStore } from '../Common/RedirectPathMange'
// import axios from 'axios'
import { signUpp } from '../../api/apiHandler'

export default function Signup() {
   
    const [ fields, errors, form ] = useFormInputValidation({
        name: '',
        email: '',

        password: '',
    

    },{
      name: 'required',
      email: 'required|email',
  
      password : 'required',

    });
    const navigate = useNavigate();
    const Clickfunc =  async (e) => {
        // make axios post request
        console.log("hi")
        const isValid = await form.validate(e);
      if(isValid){
    
            let postData = { 
                name: fields.name,
                email: fields.email,

                password: fields.password,            
            
            }
    
            signUpp(postData).then(function (res) {
              if(res.data.code == 1)
              {
                  console.log("saaaaaaa",res.data);
                  alert(res.data.message);
                  // navigate("/login");
                  loginRedirectCallWithDataStore(res.data.data);
    
              }else{
                  console.log(res.data);
                  alert(res.data.message);
              }
            }).catch(function (error) {
     
              alert(error);
          })
                
    }
    }
    


  return (
    <>
    
    <div className="page-content" style={{ backgroundImage : "url(" + "https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" + ")",backgroundSize: 'cover' }}>
		<div className="form-v7-content">   
        
			<form className="form-detail" noValidate onSubmit={Clickfunc}>
                <div className='text-center'><h2>Signup Here</h2></div>

                <div className="form-row my-3">
					<label htmlFor="username">NAME</label>
					<input type="text"  id="name" className="input-text" name="name" onBlur={form.handleBlurEvent} value={fields.name} onInput={form.handleChangeEvent}/>
                    <label className='error'>{errors.name ? errors.name : ''}</label>

				</div>
				<div className="form-row">
					<label htmlFor="your_email">E-MAIL</label>
					<input type="text" id="your_email" className="input-text" name="email" onBlur={form.handleBlurEvent} value={fields.email} onInput={form.handleChangeEvent}/>
                    <label className='error'>{errors.email ? errors.email : ''}</label>

				</div>
				<div className="form-row">
					<label htmlFor="password">PASSWORD</label>
					<input type="password"  id="password" className="input-text" name="password" onBlur={form.handleBlurEvent} value={fields.password} onInput={form.handleChangeEvent}/>
                    <label className='error'>{errors.password ? errors.password : ''}</label>

				</div>
			
        

		 
        <button className="text-center btn btn-primary"  >
                           Create Account
                         </button>
                         <div className=" form-rowtext-center my-2">
                     <Link to="/login" className="txt1" style={{color: "black"}}>
                   already have an account
                         </Link>
                     </div>
			</form>
		</div>
	</div>

    </>
  )
}
