import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ForgetPasswordPage() {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
            <div className='row'>
            <div className='col'>
        <div className="container mt-4 border rounded p-4" style={{ maxWidth: '600px', backgroundColor: '#87CEEB' }}>
            <form action="/code">
                <h2 className='text-center font-weight-bold'>Enter your email address </h2>
                <div className='d-flex justify-content-center mt-4'>
                    {' '}
                </div>
                <div className="form-group">
                <label id="reset_pass_lbl" className='font-weight-bold'>Email address:</label><br/>
                <input type="email" id="email" className="form-control mt-1" name="email" required />
                </div>
                <div className='d-flex justify-content-center mt-4'>
                    {' '}
                </div>
                <div className='d-flex justify-content-center'>
                    <button id="sub_btn" type="submit" className='btn btn-primary'>Send code to my email</button>
                </div>
                <div className='d-flex justify-content-center mt-4'>
                    {' '}
                </div>
                <div className='d-flex justify-content-center'>
                    <Link to="/login"><button id="sub_login" className='btn btn-secondary'>Back to login</button></Link>
                </div>
            </form>
        </div>
        </div>
        </div>
        </div>
    );
}