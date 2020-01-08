import React, { useEffect, useState, useContext } from 'react'
import Axios from 'axios'
import { stat } from 'fs'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PriceCalculation from './PriceCalculation'
import UserContext from '../context/context'
import BillingPage from '../billingPage/BillingPage'


export default function CartItems(props) {
    let idUser = localStorage.getItem("idUser")

    let stateShow = {
        accounts: [],

    }
    const [state, setState] = useState(stateShow)
    const context = useContext(UserContext)


    console.log("props in Cart items ", props)
    //call in the useEffect method
    let getAllAccount = () => {
        const url = `https://react-shopping-cart-fa82c.firebaseio.com/addcart/${idUser}.json`

        let axiosGetProduct = async () => {
            try {
                let response = await Axios.get(url)
                console.log("response Data", response.data);
                let arr = []
                //iterating through the object
                for (let key in response.data) {
                    const account = response.data[key]

                    arr.push({

                        ...account,
                        id: key
                    })
                }
                console.log("arr ", arr);

                function getUnique(arr, comp) {

                    const unique = arr
                        .map(e => e[comp])

                        // store the keys of the unique objects
                        .map((e, i, final) => final.indexOf(e) === i && i)

                        // eliminate the dead keys & store unique objects
                        .filter(e => arr[e]).map(e => arr[e]);

                    return unique;
                }
                let arrF = getUnique(arr, 'productName')
                // console.log("******", arrF);

                updateAfterF(arrF)

                setState({
                    accounts: arrF
                })




            } catch (error) {
                console.log("error ", error);

            }
        }
        axiosGetProduct()
    }

    //call after mounted(comp. did mount)
    useEffect(() => {
        getAllAccount()
        console.log(state.accounts);


    }, [])

    let updateAfterF = (arrF) => {
        console.log("********", arrF);
        deleteData()
        uploadFilteredData(arrF)



    }
    let deleteData = async () => {

        try {

            const url = `https://react-shopping-cart-fa82c.firebaseio.com/addcart/${context.idUser}/.json`
            let response = await Axios.delete(url)
            console.log("response ", response);


        } catch (error) {

            console.log();

        }

    }
    
    let uploadFilteredData = (arrF) => {

        try {

            arrF.map((value)=>{

            const url = `https://react-shopping-cart-fa82c.firebaseio.com/addcart/${idUser}.json`

            let response = Axios.post(url,value)
            console.log(response);
            
           })

        } catch (error) {

            console.log(error);

        }


    }

    let deleteCart = async (accToDelete) => {

        console.log("Account to  be delete ", accToDelete);
        const id = accToDelete.id
        console.log("id ", id);

        const url = `https://react-shopping-cart-fa82c.firebaseio.com/addcart/${context.idUser}/` + id + `/.json`


        try {
            const response = await Axios.delete(url)
            console.log("response of delete ", response);

            const myAccounts = [...state.accounts]
            const index = myAccounts.indexOf(accToDelete)
            myAccounts.splice(index, 1)
            console.log("myAccounts ", myAccounts);

            setState({
                ...state,
                accounts: myAccounts
            })
        } catch (error) {
            console.log("error", error);

        }

    }

    let billingfn = () => {

        props.history.push('/billingpage')

    }

    const imgStyle = {
        width: '150px',
        height: '150px'
    }



    return (
        <div className=''>
            <div className='row '>
                <div className='col-md-5 mt-5 mb-5'>
                    {
                        state.accounts.map((value, index) => {
                            return (
                                <div className='ml-2 card'>
                                    <div className=' card-body'>
                                        <h4>{value.productName}</h4>
                                        <img src={value.image} className="mt-3 ml-2" style={imgStyle} alt="img"></img>
                                        <div className='text-primary'>{value.brand}</div>
                                        <div>price:{value.price}</div>
                                        <button className='btn btn-primary mt-2' onClick={() => {
                                            deleteCart(value)
                                        }

                                        }
                                        >Remove</button>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <div className='col-md-5 mt-1  '>
                    <div className='bg-light '>

                        <div className='offset-3 mt-5  '>
                            <PriceCalculation data={state.accounts} />
                            <button onClick={billingfn} className="btn mb-5 offset-md-2 offset-sm-1 btn-primary">PlaceOrder</button>

                        </div>



                    </div>

                </div>




            </div>


        </div>
    )

}



