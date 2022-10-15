import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {showProfile} from '../../api/apiHandler'

export default function Showprofile() {
    var [data, setData] = useState([]);
    useEffect(() => {
        showProfile().then((resposnse)=>{
            if(resposnse.data.code==1){
                console.log(resposnse.data.data)
                
                setData(resposnse.data.data)
                alert(resposnse.data.message);
            }else{
                console.log('data not found')
                alert(resposnse.data.message);

            }
        });
    }, []);
    return (

    <>
<div className="page-content" style={{ backgroundImage : "url(" + "https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" + ")",backgroundSize: 'cover', }} >
     <div className="form-v7-content">
     
         <div className="form-detail" >
             <div className='text-center'><h2>Your Profile</h2></div>
             
             <div className="form-row">
                 <label htmlFor="your_email">E-MAIL</label>
                 <p className="text-muted">{data.email}</p>

             </div>
             <div className="form-row">
                 <label htmlFor="password">Name</label>
                 <p className="text-muted">{data.name}</p>
             </div>

                     <div className=" form-rowtext-center my-2">
                     <Link to={"/"} className="txt1" style={{color: "blue"}}>
                     Back to Home
                         </Link>
                     </div>
         </div>
     </div>
 </div>

           </>

           
    )
}
