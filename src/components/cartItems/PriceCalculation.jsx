import React, { useContext } from 'react'
import UserContext from '../context/context';

export default function PriceCalculation(props) {
    

    console.log(props);
    let sum = 0
    props.data.map((value) => {
        console.log("price ", value.price);
        let price = parseFloat(value.price)

        sum = sum + price
    })
    
    console.log("sum ", sum);
    localStorage.setItem("sum",sum)
    
    return (
        <>
            <div className='mt-5'>
                <h5 className='offset-md-2 mt-5'>Total : {sum}</h5>
            </div>

        </>
    )
}
