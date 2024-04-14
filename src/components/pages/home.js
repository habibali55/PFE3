import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomePage() {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <span className="navbar-brand mb-0 h1">logo</span>
                <div className="ml-auto">
                    <Link to="/login">
                        <button className='btn btn-primary mr-2'>Log in</button>
                    </Link>  
                    <Link to="/">
                        <button className='btn btn-secondary'>Log out</button>
                    </Link>
                </div>
            </nav>
            <div className="container-fluid d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <div className="row">
           <div className="col">
                <h1 className="main-title home-page-title text-center font-weight-bold mb-5">Bienvenue à notre site de gestion des employés</h1>
            </div>
            </div>
            </div>
            </div>
    );
}
