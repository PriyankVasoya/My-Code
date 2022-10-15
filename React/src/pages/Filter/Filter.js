import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom';
import { AddtoCart, Filterapi } from '../../api/apiHandler'

export default function Filter() {
  var [data, setData] = useState([]);

  const { company_id } = useParams();

  function addDatatoCart(id) {
    console.log("hello", id)

    const cart = {
      product_id: id,
      product_qty: '1',
    }

    AddtoCart(cart).then((res) => {
      console.log("Profile Data", res.data)
      if (res.data.code == 1) {
        console.log("Success")
        alert("Add in cart successfully");
      }
      else {
        console.log("Success")
        alert("Add in cart successfully");
      }
    });
  }

  useEffect(() => {
    Filterapi({"company_id": company_id}).then((resposnse) => {
      if (resposnse.data.code == 1) {
        setData(resposnse.data)
      } else {
        console.log('data not found')
      }
    });
  }, [company_id]);
  return (

    <>
      <Helmet>
        <style>{`
         .card-title{
          color: black;       }
       .namee{
      
        color: white !important;
       }
         `}   
        </style>
      </Helmet>
      <div className="form-row-last">

      </div>
      <div className="container-fluid mt-5 mb-4">
        <div className="card">

          <div className="card-body bg-dark">
            <h2 className="namee text-center "> Products</h2>

          </div>
        </div>
        <div className="row pt-3 pb-5">

          {data.data?.map((phonedata, index) => {
            return (
              <div key={index} className="col-lg-3 col-md-6 mt-sm-20" >
                <div className="card my-3" >
                  <img src={phonedata.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title text-center" > {phonedata.product_name}</h5>
                    <div className="col text-left my-3">
                      <p><b>Detail :</b> {phonedata.product_specification}</p>

                    </div>
                    <div className="row pb-4 pt-2">
                      <div className="col">
                        <h5>Price :{phonedata.price}</h5>
                      </div>
                      <div className="col text-right">
                        <h5>Version :{phonedata.os_version}</h5>
                      </div>
                    </div>
                    <button type="button" class="btn btn-primary"><a onClick={() => addDatatoCart(phonedata.id)}> Add to cart</a></button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </>
  )
}
