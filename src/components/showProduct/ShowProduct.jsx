import React, { useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import InputSearch from './InputSearch'
import UserContext from '../context/context'

export default function ShowProduct(props) {
    let stateShow = {
        accounts: [],
        show: false,



    }
    let stateWishlist = {
        accounts: []

    }
    const context = useContext(UserContext)


    const [wishlistData, setWishlistData] = useState(stateWishlist)
    const [state, setState] = useState(stateShow)
    const [filterData, setFilterData] = useState({ accounts: [] })
    //This method call in useEffect
    let getAllAccount = () => {
        const url = "https://react-shopping-cart-fa82c.firebaseio.com/addproduct.json"
        const urlW = "https://react-shopping-cart-fa82c.firebaseio.com/addwishlist.json"

        let axiosGetProduct = async () => {
            try {
                let responseWishlist = await Axios.get(urlW)

                let response = await Axios.get(url)
                console.log("response Data", response.data);
                console.log("responseWishlist Data", responseWishlist.data);

                let arr = []
                let arrWishlist = []
                //iterating through the object
                for (let key in responseWishlist.data) {
                    const account = responseWishlist.data[key]

                    arrWishlist.push({

                        ...account,
                        id: key,
                        wishlist: false
                    })
                }
                console.log("arrWishlist ", arrWishlist);
                
                setWishlistData({
                    ...wishlistData,
                    accounts:arrWishlist
                })
                
                console.log("accounts ", wishlistData.accounts);

                //iterating through the object
                for (let key in response.data) {
                    const account = response.data[key]

                    arr.push({

                        ...account,
                        id: key,
                    })
                }
                console.log("arr ", arr);
                //To add the value in to the state 

                setState((prevState) => {
                    state.accounts = arr
                    return { ...prevState, ...state.accounts };
                })

                console.log("accounts ", state.accounts);



            } catch (error) {
                console.log("error ", error);

            }
        }

        axiosGetProduct()



    }

    useEffect(() => {
        getAllAccount()

    }, [])


    let dataFn = (valueI) => {
        console.log("value from inputSearch ", valueI);
        if(valueI.length === 0){
            setFilterData({
                accounts:state.accounts
            })
        }
        else{
            let filterdData = state.accounts.filter((value) => {
                console.log(value);
    
                return value.productName.includes(valueI)
            })
            console.log("value in filterdData ", filterdData);
            setFilterData({
                accounts:filterdData
            })
           
        }
        


    }


    //Adding the cart-data to database
    let buttonClick = (value) => {

        console.log("value by clicking the button ", value)

        const formData = value
        console.log("formData: ", formData);
        const url = `https://react-shopping-cart-fa82c.firebaseio.com/addcart/${context.idUser}.json`

        let axiosAddCart = async () => {
            try {
                let response = await Axios.post(url, formData)
                console.log("response ", response);
                const status = response.status
                console.log("status :", status);
                if (status === 200) {

                    console.log("Successfully Added to the Cart");
                    // props.history.push("/cart")

                } else {
                    console.log("Failed to Add");

                }
            } catch (error) {
                console.log(error);

            }


        }
        axiosAddCart()






    }
    let wishlistClick = (wishlistDa) => {
        let data = filterData.accounts
        console.log("data ", data);

        data.map((value) => {
            if (value.id === wishlistDa.id) {
                return value.wishlist = !value.wishlist
            }
        })
        setFilterData({
            accounts: data
        })
      

        
        wishlistFunction(wishlistDa)

    }
    let wishlistFunction= (wishlistData)=>{
        console.log(wishlistData);
        if(wishlistData.wishlist){
            console.log("uploaded");
            uploadingWishlist(wishlistData)
            
        }else{
            console.log("deleted");
            deletingWishlist(wishlistData)
        }
        
    }


    let uploadingWishlist = async (wishlistData) => {

        
        console.log("here");


        const url = `https://react-shopping-cart-fa82c.firebaseio.com/addwishlist/${context.idUser}.json`
        try {
            let response = await Axios.post(url, wishlistData)
            console.log("response from server ", response);


            const status = response.status
            console.log("status :", status);
            if (status === 200) {

                console.log("Successfully Added to the wishlist");
                getAllAccount()

            } else {
                console.log("Failed to Add");

            }
        } catch (error) {
            console.log(error);

        }

    }
    let getFromUpdated = async()=>{
        
    }

    let deletingWishlist = async (wishlistDa) => {
        

        console.log("Account to  be delete ", wishlistDa);
        const id = wishlistDa.id
        console.log("id ", id);

       /*  const url = `https://react-shopping-cart-fa82c.firebaseio.com/addwishlist/${context.idUser}/` + id + `/.json`


        try {
            const response = await Axios.delete(url)
            console.log("response of delete ", response);

            
        } catch (error) {
            console.log("error", error);

        } */
 
    }




 /* 
        const url = "https://react-shopping-cart-fa82c.firebaseio.com/addwishlist/" + id + '/.json'

        const response = await Axios.delete(url)
        console.log(response);

 */



   



    const imgStyle = {
        width: '100px',
        height: '100px'
    }
   


    return (
        <>
            <div className=" row col-md-9 offset-md-2 offset-sm-4 col-sm-6">
                <InputSearch dataFn={dataFn} />

            </div>
            <div className="row mt-5 mb-3 container">
                {filterData.accounts !== undefined ? filterData.accounts.map((value, index) => {


                    return <div className="offset-md-1 col-md-3 col-sm-5 mt-5 card">
                        <div className="card-body ">
                            {!value.wishlist ? <i onClick={() => {
                                wishlistClick(value)
                            }} className="fas fa-heart " ></i> : <i  onClick={() => {
                                wishlistClick(value)
                            }} className="fas fa-heart text-danger"></i>}
                            <h6>{value.productName}</h6>
                            <img src={value.image} className="mt-3 ml-2" style={imgStyle} alt="img"></img>
                            <div className='text-primary'>{value.brand}</div>
                            <div>price:{value.price}</div>

                            <button onClick={() => {
                                buttonClick(value)
                            }} className="mt-3 btn btn-primary">AddToCart</button>


                        </div>

                    </div>






                }) : null}
            </div>

        </>
    )
}



