import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import AddProduct from '../addProduct/AddProduct'
import ShowProduct from '../showProduct/ShowProduct'
import CartItems from '../cartItems/CartItems'
import Wishlist from '../wishlist/Wishlist'
import UserContext from '../context/context'
import Login from '../login/Login'
import CreateAccount from '../createAccount/CreateAccount'
import Home from '../home/Home'
import BillingPage from '../billingPage/BillingPage'

export default function NavBar() {
    const context = useContext(UserContext)
    console.log("role in navbar ", context.role);

    return (
        <>
            <div className='App'>
                <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                    <a className="navbar-brand"><i className="fab fa-audible"></i>App</a>
                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                    </div>
                    {!context.login ?

                        <ul className="navbar-nav offset-6 mt-lg-0">

                            <li id="create-li" className="nav-item  ">
                                <Link to='/login' className="nav-link">Login</Link>
                            </li>
                            <li id="show-li" className="nav-item  ">
                                <Link to='/createaccount' className="nav-link"><i className="fas fa-plus-circle"></i>CreateAccount</Link>
                            </li>

                        </ul>
                        :
                        <ul className="navbar-nav offset-6 mt-lg-0">
                            <li id="create-li" className="nav-item  ">
                                <Link to='/home' className="nav-link">Home</Link>
                            </li>

                            {context.role === "Admin" ? <li id="create-li" className="nav-item  ">
                                <Link to='/addproduct' className="nav-link"><i className="fas fa-plus-circle"></i>AddProduct</Link>
                            </li> : null}
                            <li id="show-li" className="nav-item  ">
                                <Link to='/showproduct' className="nav-link"><i className="far fa-eye"></i>ShowProduct</Link>
                            </li>
                            <li id="show-li" className="nav-item  ">
                                <Link to='/cart' className="nav-link"><i className="fas fa-cart-arrow-down"></i>Cart</Link>
                            </li>
                            <li id="show-li" className="nav-item  ">
                                <Link to='/wishlist' className="nav-link"><i className="fas fa-heart"></i>Wishlist</Link>
                            </li>
                            <li id="create-li" className="nav-item  ">
                                <Link onClick={() => context.setLogin(false)} to='/login' className="nav-link">Logout</Link>

                            </li>
                        </ul>
                    }
                </nav>
                {context.login ? <Route exact path='/home' component={Home} /> : <Route path='/home' component={Login} ></Route>}

                {context.login ? <Route exact path='/addproduct' component={AddProduct} /> : <Route path='/addproduct' component={Login} ></Route>}
                {context.login ? <Route exact path='/showproduct' component={ShowProduct} ></Route> : <Route path='/showproduct' component={Login} ></Route>}
                {context.login ? <Route exact path='/cart' component={CartItems} ></Route> : <Route path='/cart' component={Login} ></Route>}
                {context.login ? <Route exact path='/wishlist' component={Wishlist} ></Route> : <Route path='/wishlist' component={Login} ></Route>}

                {context.login ? <Route path='/billingpage' component={BillingPage} ></Route> : <Route path='/wishlist' component={Login} ></Route>}

                <Route path='/createaccount' component={CreateAccount} ></Route>

                <Route path='/login' component={Login} ></Route>

            </div>
        </>
    )
}
