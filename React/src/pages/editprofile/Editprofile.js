
import { useFormInputValidation } from 'react-form-input-validation'

import { loginRedirectCallWithDataStore } from '../Common/RedirectPathMange'
// import axios from 'axios'
import { editApi } from '../../api/apiHandler'

export default function Editprofile() {

    const [ fields, errors, form ] = useFormInputValidation({
        name: '',
        email: '',


    },{
      name: 'required',
      email: 'required|email',
  
 
    });
    
    const Clickfunc =  async (e) => {
        // make axios post request
        const isValid = await form.validate(e);
      if(isValid){
    
            let postData = { 
                name: fields.name,
                email: fields.email,

            }
    
            editApi(postData).then(function (res) {
              if(res.data.code == 1)
              {
                  console.log("saaaaaaa",res.data);
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
                <div className='text-center'><h2>Edit Profile</h2></div>

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

        <button className="text-center btn btn-primary"  >Login</button>
               
			</form>
		</div>
	</div>

    </>
  )
}

