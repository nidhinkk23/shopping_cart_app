import React, { useContext } from 'react'
import UserContext from '../context/context'

export default function Profile() {

    const context = useContext(UserContext)
    console.log("profile ", context.details);
    let details = context.details



    return (
        <div>
            <div className="card col-md-5 offset-md-4 offset-sm-2 mt-5 col-sm-4" >

                <div className="card-body offset-md-2 offset-sm-1">
                    <h5 className="card-title">{details.firstName}</h5>
                    <p className="card-text">email: {details.email}</p>
                    <p className="card-text">Gender: {details.gender}</p>
                    <p className="card-text">Role: {details.role}</p>
                </div>
            </div>
        </div>
    );
}
