import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useFormInputValidation } from 'react-form-input-validation'

import { loginRedirectCall } from '../Common/RedirectPathMange'
// import axios from 'axios'
import { forgotPassword } from '../../api/apiHandler'

export default function ForgotPassword() {
   
    const [ fields, errors, form ] = useFormInputValidation({
       
        email: '',

    },{
     
      email: 'required|email',
  
    });
    const navigate = useNavigate();
    const Clickfunc =  async (e) => {
        // make axios post request
        console.log("hi")
        const isValid = await form.validate(e);
      if(isValid){
    
            let postData = { 
              
                email: fields.email,

                   
            
            }
    
            forgotPassword(postData).then(function (res) {
              if(res.data.code == 1)
              {
                  console.log("saaaaaaa",res.data);
                //   alert(res.data.message);
                  // navigate("/login");
                  loginRedirectCall();
    
              }else{
                  console.log(res.data);
                //   alert(res.data.message);
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

               
				<div className="form-row">
					<label htmlFor="your_email">E-MAIL</label>
					<input type="text" id="your_email" className="input-text" name="email" onBlur={form.handleBlurEvent} value={fields.email} onInput={form.handleChangeEvent}/>
                    <label className='error'>{errors.email ? errors.email : ''}</label>

				</div>
		
        

		 
        <button className="text-center btn btn-primary" type="submit" >
                           Create Account
                         </button>
                    
			</form>
		</div>
	</div>

    </>
  )
}
