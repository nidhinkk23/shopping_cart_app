import React, { useContext } from 'react'
import UserContext from '../context/context';

export default function BillingPage(props) {
    const context = useContext(UserContext)
    let price = localStorage.getItem("sum")
    console.log("BillingPage ",props);
    return (
        <div className="row">
          
          <div className='col-md-4 col-sm-4 card bg-secondary offset-md-4 offset-sm-2 mt-5' >
            <div className="card-body">
               <div className="mt-5 mb-5 "> Total Amount: {price}</div>
               <button>BuyeItems</button>
            </div>
          </div>
        </div>
    )
}
