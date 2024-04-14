import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginPage() {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <span className="navbar-brand mb-0 h1">logo</span>
                <div className="ml-auto">
                <Link to="/home"><button id="sub_home" className='btn btn-secondary'>back to home</button></Link>
               </div>
              </nav>
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
            <div className='row'>
            <div className='col'>
        <div className="container mt-5 border rounded p-5" style={{ maxWidth: '500px', backgroundColor: '#87CEEB'}}>
            <form >
                 <h2  className='text-center font-weight-bold'>login</h2>
                 <div className='d-flex justify-content-center mt-3'>
                    {' '}
                </div>
                <div className="form-group">
                    <label className='font-weight-bold'>Username ou email adress </label><br/>
                    <input type="text" className="form-control" name="first_name" required />
                    </div>
                <div className="form-group">
                    <label className='font-weight-bold'>Password</label><br/>
                    <input type="password" className="form-control" name="password" required />
                    </div>
                    <div className="d-flex justify-content-center">
                    <Link to="/interfaceEmp"><button id="sub_btn" className='btn btn-primary'>Login</button></Link>
                </div>
                <div className='d-flex justify-content-center mt-3'>
                    {' '}
                </div>
                <div className="d-flex justify-content-center">
                    <Link to="/interfaceRH"><button className='btn btn-primary'>LoginRH</button></Link>
                </div>
                <div className='d-flex justify-content-center mt-3'>
                    {' '}
                </div>
            <div className="d-flex justify-content-center">
            <Link to="/forget-password" className="right-label">forget password?</Link>
            </div>
            </form>
            </div>
        </div>
        </div>
        </div>
        </div>
    )    
}