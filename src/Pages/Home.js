import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'
export default function Home() {
    const USERS_API_BASE_URL = "http://localhost:1012/api/v1/users";
    const [users, setUsers] = useState([]);
    useEffect(() => {
        loadUsers();
    }, []);
    const { id } = useParams();
    const loadUsers = async () => {
        const result = await axios.get(USERS_API_BASE_URL);
        setUsers(result.data);
    };
    const confirmDeleteUser =async (id) => {

        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => deleteuser(id)
            },
            {
              label: 'No',
            }
          ]
        });
      }

    const deleteuser = async(id)=>{
        const result = await axios.delete(`http://localhost:1012/api/v1/users/${id}`);
        loadUsers();
    }
    return (
        <div className='container'>
            <div className='py-4'>

                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Email Address</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr>
                                <th scope="row" key={index}>
                                    {index + 1}
                                </th>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.emailAddress}</td>
                                <td>
                                    <Link className='btn btn-primary mx-2' to={`/viewuser/${user.id}`}>View</Link>
                                    <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`} >Edit</Link>
                                    <Link className='btn btn-danger mx-2' onClick={()=>{confirmDeleteUser(user.id)}}>Delete</Link>


                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        </div>
    )
}
