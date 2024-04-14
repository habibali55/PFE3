import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function resetPage() {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
        <div className='row'>
            <div className='col'>
        <div className="container mt-4 border rounded p-4" style={{ maxWidth: '600px', backgroundColor: '#6CA6CD' }}>
            <form action="/home">
                <h2 className='text-center font-weight-bold'>change your password</h2>
                <div className='d-flex justify-content-center mt-4'>
                    {' '}
                </div>
                    <label className="form-group font-weight-bold">new Password:</label><br/>
                    <input type="password" className="form-control mt-1" name="password" required />
                    <div className='d-flex justify-content-center mt-4'>
                    {' '}
                </div>
                    <label className="form-group font-weight-bold">confirm Password:</label><br/>
                    <input type="password" className="form-control mt-1" name="password" required />
                    <div className='d-flex justify-content-center mt-4'>
                    {' '}
                </div>
                    <div className='d-flex justify-content-center'>
                    <button id="sub_btn" type="submit" className='btn btn-primary'>Set Password and Login</button>
                   </div>
                   <div className='d-flex justify-content-center mt-4'>
                    {' '}
                </div>
                   <div className='d-flex justify-content-center'>
               <Link to="/home"><button id="sub_home" className='btn btn-secondary'>back to home</button></Link>
                </div>
            </form>
        </div>
        </div>
       </div>
        </div>
    )
}