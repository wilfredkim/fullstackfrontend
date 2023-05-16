import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";



export default function AddUser() {
    const USERS_API_BASE_URL = "http://localhost:1012/api/v1/users";
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
    });
    const { name, username, emailAddress } = user;
    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    let navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(USERS_API_BASE_URL,user);
        console.log("done navigating now,,,");
        navigate("/");
        
      };
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Add User</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">Name</label>
                            <input type={"text"} className="form-control" placeholder="Enter your name" name="name" value={name}
                             onChange={(e) => onInputChange(e)}/>
                        

                        </div>
                        <div className="mb-3">
                            <label htmlFor="UserName" className="form-label">Username</label>
                            <input type={"text"} className="form-control" placeholder="Enter your username" name="username" value={username}
                             onChange={(e) => onInputChange(e)}/>

                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type={"email"} className="form-control" placeholder="Enter your email address" aria-describedby="emailHelp" name="emailAddress" value={emailAddress}
                             onChange={(e) => onInputChange(e)}/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button className="btn btn-danger" to="/">Cancel</button>
                    </form>
                </div>



            </div>

        </div>
    )
}
