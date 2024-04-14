import React from 'react';
import { FaTh, FaUser, FaThList, FaUserCircle } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { NavLink } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Sidebar = ({ children }) => {
    const menuItem = [
        {
            path: "/emploidutemps",
            name: "emploi du temps",
            icon: <FaTh style={{ color: '#FFFFFF' }} />
        },
        {
            name: "congé",
            icon: <FaUser style={{ color: '#FFFFFF' }} />,
            subItems: [
                {
                    path: "/demandedecongé",
                    name: "demande de congé",
                },
                {
                    path: "/listedescongés",
                    name: "liste des congés",
                }
            ]
        },
        {
            path: "/formations",
            name: "formations",
            icon: <FaThList style={{ color: '#FFFFFF' }} />
        },
        {
            path: "/profile",
            name: "profile",
            icon: <FaUserCircle style={{ color: '#FFFFFF' }} />
        }
    ];

    return (
        <div style={{ display: 'flex' }}>
            <div className="sidebar" style={{ height: '100vh', width: '200px', transition: 'all 0.5s', background: '#000000' }}>
                <div className="top_section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 15px' }}>
                    <div className="icon" style={{ color: '#FFFFFF', fontSize: '60px' }}>
                        <RxAvatar />
                    </div>
                    <h2 style={{ color: '#FFFFFF' }} className="container-fluid d-flex align-items-center justify-content-center font-weight-bold">username employe</h2>
                </div>
                <div style={{ marginBottom: '20px' }}></div>
                {menuItem.map((item, index) => (
                    <div key={index}>
                        {item.subItems ? (
                            <Dropdown>
                                <Dropdown.Toggle as={NavLink} to={item.path} className="link" style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', fontSize: '25px' }}>
                                    <div className="icon">{item.icon}</div>
                                    <div style={{ color: '#FFFFFF', marginRight: '10px', fontSize: '25px', minWidth: '40px' }} className="link_tex">{item.name}</div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {item.subItems.map((subItem, subIndex) => (
                                        <Dropdown.Item key={subIndex} as={NavLink} to={subItem.path} className="link" style={{ display: 'flex', alignItems: 'center', padding: '10px 40px', fontSize: '20px' }}>
                                            <div className="icon">{subItem.icon}</div>
                                            <div style={{ color: '#000000', marginRight: '10px', fontSize: '20px', minWidth: '40px' }} className="link_tex">{subItem.name}</div>
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <NavLink to={item.path} className="link" style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', fontSize: '25px' }}>
                                <div className="icon">{item.icon}</div>
                                <div style={{ color: '#FFFFFF', marginRight: '10px', fontSize: '25px', minWidth: '40px' }} className="link_tex">{item.name}</div>
                            </NavLink>
                        )}
                    </div>
                ))}
            </div>
            <div>
      
      </div>
           
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '25px' }}>{children} </main>
          
        </div>
    );
};

export default Sidebar; 


