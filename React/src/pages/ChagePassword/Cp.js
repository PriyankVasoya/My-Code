
import { useFormInputValidation } from 'react-form-input-validation'
import { Link } from 'react-router-dom';
import { logOutRedirectCall } from '../Common/RedirectPathMange';
import { cpass } from '../../api/apiHandler';
import { useNavigate } from 'react-router-dom';

export default function Cp() {


    const [fields, errors, form] = useFormInputValidation({
        old_password: '',
        new_password: '',
        confirm_password: ''
    }, {
        old_password: 'required',
        new_password: 'required',
        confirm_password: 'required|same:new_password'
    });

    const navigate = useNavigate();

    const onSubmit = async (e) => {

        const isValid = await form.validate(e);
        if (isValid) {
            console.log(true)
            let data = {
                old_password: fields.old_password,
                new_password: fields.new_password
            }

            cpass(data).then((res) => {
                if (res.data.code == 1) {
                    alert("done");
                    navigate("/login");
                    logOutRedirectCall()
                } else {
                    alert(res.data.message);
                }
            });
        }else{
            console.log(false)
        }
    }

    return (
        <>

            <div className="page-content" style={{ backgroundImage: "url(" + "https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" + ")", backgroundSize: 'cover' }}>
                <div className="form-v7-content">

                    <form className="form-detail" noValidate onSubmit={onSubmit}>
                        <div className='text-center'><h2>Change Password</h2></div>

                        <div className="form-row">
                            <label htmlFor="password">OLD PASSWORD</label>
                            <input type="password" id="old_password" className="input-text" name="old_password" onBlur={form.handleBlurEvent} value={fields.old_password} onInput={form.handleChangeEvent} />
                            <label className='error'>{errors.old_password ? errors.old_password : ''}</label>

                        </div>
                        <div className="form-row">
                            <label htmlFor="password">NEW PASSWORD</label>
                            <input type="password" id="password" className="input-text" name="new_password" onBlur={form.handleBlurEvent} value={fields.new_password} onInput={form.handleChangeEvent} />
                            <label className='error'>{errors.password ? errors.password : ''}</label>

                        </div>
                        <div class="form-row">
                            <label for="comfirm_password">CONFIRM PASSWORD</label>
                            <input type="password" name="confirm_password" id="confirm_password" class="input-text" onBlur={form.handleBlurEvent} value={fields.confirm_password} onInput={form.handleChangeEvent} />
                            <label className='error'>{errors.confirm_password ? errors.confirm_password : ''}</label>

                        </div>


                        <div className="form-row-last">
                            {/* <button class="btn btn-primary" type="submit" >Submit</button> */}
                            {/* <Link to={"/login"}> */}
                                <button class="btn btn-primary" type="submit" value="i have an account">login</button>
                                {/* </Link> */}

                        </div>

                    </form>
                </div>
            </div>

        </>
    )
}
