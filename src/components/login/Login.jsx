import React, { useContext, useState, useEffect } from 'react'
import UserContext, { UserProvider } from '../context/context'
import { TextField } from '@material-ui/core'
import Axios from 'axios'
import NavBar from '../navbar/NavBar'

export default function Login(props) {

    const context = useContext(UserContext)
    let states = {
        email: "",
        password: "",
        accounts: [],
        
    }
    const [state, setState] = useState(states)


    let handleChange = (event) => {
        const value = event.target.value
        setState({
            ...state,
            [event.target.name]: value
        })

    }

    let getAllAccounts = async () => {
        const url = `https://react-shopping-cart-fa82c.firebaseio.com/account.json`
        let response = await Axios.get(url)
        console.log("response", response);
        let arr = []
        for (let key in response.data) {
            console.log("Key ", key);
            //Our data present inside data obj 
            const account = response.data[key]
            console.log("acccount", account);
            //Copying the data
            arr.push(
                {
                    ...account,
                    id: key
                }

            )

        }
        console.log("array ", arr);
        setState({
            ...state,
            accounts: arr
        })

    }
    let handleSubmit = (event) => {
        event.preventDefault()
        console.log("state.accounts ", state.accounts);
        state.accounts.map((value, index) => {
            console.log(value.email);
            console.log(value.password);
            if (value.email === state.email && value.password === state.password) {
                console.log("success",value.id);
                  context.setRole(value.role)
               
                context.setId(value.id)
                props.history.push('/home')
                context.setLogin(true)


            } else {
                console.log("fail");

            }


        })










    }
    useEffect(() => {

        getAllAccounts()


    }, [])
    return (
        <div>
            {/* <TextField id="standard-basic" label="Standard" /> */}
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group col-md-4 col-sm-4 mt-5 mb-5   offset-md-4">
                        <h1 className="offset-3" >Login</h1>
                        <TextField className="form-control mb-3"
                            placeholder='Email'
                            name='email'
                            value={state.email}
                            onChange={handleChange}
                            type="text"></TextField>
                        {/*  {this.state.showUserName ?
                            <p style={unameStyle}>{this.state.value1}</p> : null}
 */}
                        <TextField className="form-control mb-3"
                            placeholder='password'
                            name='password'
                            value={state.password}
                            onChange={handleChange}
                            type="text"></TextField>
                        {/*   {this.state.showPassword ?
                            <p style={unameStyle}>{this.state.value2}</p> : null} */}

                        <div>

                            <button className="btn btn-outline-info col-md-4 mt-3 offset-3 " id="login"
                                type="submit">login</button>

                        </div>

                    </div>


                </form>
            </div>
           

        </div>
    )
}
