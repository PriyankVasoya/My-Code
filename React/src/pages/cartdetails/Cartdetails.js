import React, { useEffect, useState, useCallback } from 'react'
import { cartDetails, removeitem } from '../../api/apiHandler'


export default function Dashboard() {

    const [data, setData] = useState([]);
    var grandTotal = 0;
    useEffect(() => {
        clickSubmitButton();
    }, []);
    const clickSubmitButton = () => {

        console.log(" Api Calling");

        cartDetails({}).then((resposnse) => {

            console.log(resposnse)
            if (resposnse.data.code == 1) {
                setData(resposnse.data.data)
            } else {
                alert(resposnse.data.message, "danger")
            }
        });
    }


    function removecartitem(e) {
        var user_id = localStorage.getItem("MAid")
        var product_id = e.target.id

        removeitem({ "product_id": product_id, "user_id": user_id }).then((resposnse) => {
            // console.log(id)
            console.log(resposnse)
            if (resposnse.data.code == 1) {
                clickSubmitButton();
                alert('remove item')

            } else {
                alert('remove item failed')
            }
        })
    }


    return (
        <>
            <div className='container'>
                <div className='row'>
                    <h1 className='text-center mb-5 mt-5'>Cart Details</h1>
                    <table className="table card-body">
                        <thead>
                            <tr>

                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Product Qty</th>
                                <th>SubTotal</th>

                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, para) => {
                                grandTotal += item.total;
                                return (

                                    <tr key={para}>

                                        <td><img src={item.image} alt="" style={{ width: 150 }} /></td>
                                        <td>{item.product_name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.product_qty}</td>
                                        <td>{item.total}</td>
                                        <td><p className='btn btn-danger' id={item.id} onClick={removecartitem}>Remove</p></td>
                                    </tr>

                                )
                            })}
                        </tbody>

                    </table>
                    <div className='text-center' style={{ marginLeft: "360px" }}>
                        <h1 >GrandTotal : {grandTotal}</h1>
                    </div>
                </div>
            </div>
        </>
    );
}
