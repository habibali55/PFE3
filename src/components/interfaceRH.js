import React from 'react';
import {
    FaTh, 
    FaUser,
    FaThList,
    FaUserCircle
} from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Interface = ({children}) => {
    const menuItem = [
        {
            path: "/gereremploidutemps",
            name: "gerer emploi du temps",
            icon: <FaTh style={{ color: '#FFFFFF' }}  />
        },
        {
            path: "/gererlesconges",
            name: "gerer les conges",
            icon: <FaUser style={{ color: '#FFFFFF' }}  />
        },
        {
            path: "/gererlesformations",
            name: "gerer les formations",
            icon: <FaThList style={{ color: '#FFFFFF' }} />
        },
        {
            path: "/profileRH",
            name: "profileRH",
            icon: <FaUserCircle style={{ color: '#FFFFFF' }} />
        }
    ];

    return (
        <div style={{ display: 'flex' }}>
            <div className="sidebar" style={{ height: '100vh', width: '200px', transition: 'all 0.5s', background: '#000000'}}>
                <div className="top_section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 15px'}}>
                    <div className="icon" style={{ color: '#FFFFFF', fontSize: '60px'}}>
                        <RxAvatar />   
                    </div>   
                    <h2 style={{ color: '#FFFFFF'}} className="container-fluid d-flex align-items-center justify-content-center font-weight-bold">username responRH</h2>
                </div>
                <div style={{ marginBottom: '20px'}}></div>
                {menuItem.map((item, index) => (
                    <NavLink to={item.path} key={index} className="link" style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', fontSize: '25px'}}>
                        <div className="icon">{item.icon}</div>
                        <div style={{ color: '#FFFFFF', marginRight: '10px', fontSize: '25px', minWidth: '40px'}} className="link_tex">{item.name}</div>
                    </NavLink>  
                ))}
            </div>
            <main style={{ flex: 1, padding: '30px' }}>{children}</main>
        </div>
    )        
};

export default Interface;



