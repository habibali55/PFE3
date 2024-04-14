import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
export default function CodePage() {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
        <div className='row'>
        <div className='col'>
        <div className="container mt-5 border rounded p-5" style={{ maxWidth: '600px', backgroundColor: '#6CA6CD' }}>
            <form action="/reset">
                <h2 className='text-center font-weight-bold'>Verification Code</h2>
                <div className='d-flex justify-content-center mt-4'>
                    {' '}
                </div>
                <div className="form-group">
                    <label id="reset_pass_lbl" className='font-weight-bold'>Code:</label><br/>
                    <input type="code" className="form-control mt-1"name="code" required />
                    </div>
                    <div className='d-flex justify-content-center'>
                    <Link to="/reset"><button id="sub_home"className='btn btn-primary'>Verification code</button></Link>
                    </div>
                    <div className='d-flex justify-content-center mt-4'>
                    {' '}
                </div>
                    <div className='d-flex justify-content-center'>
                <Link to="/home"><button id="sub_home"className='btn btn-secondary'>back to home</button></Link>
                </div>
            </form>
        </div>
        </div>
        </div>
        </div>
    )
}