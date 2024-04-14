import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
    <nav className="navbar navbar-dark bg-dark">
    <div className="ml-auto">
           <Link to="/interfaceEmp"><button id="sub_home" className='btn btn-secondary'>interfaceEmp</button></Link>
                {' '}
             <Link to="/login"><Button variant="primary" size='md'>Login</Button></Link>
                {' '}
                <Link to="/home"><Button variant="secondary" size='md'>Back to Home</Button></Link>       
    </div>
    </nav>
         <div className="container-fluid d-flex align-items-center justify-content-center " style={{ height: "100vh" }}>
        <div className="row">
           <div className="col">
      <h2 className="text-center font-weight-bold mb-5">your Profile</h2>
      <div className='text-center'>
          {userData && userData.map(user => (
            <div key={user._id} className="mb-5" style={{ border: '5px solid #ccc', padding: '20px', borderRadius: '10px' }}>
              <p><strong>CIN:</strong> {user.CIN}</p>
              <p><strong>First Name:</strong> {user.firstName}</p>
              <p><strong>Last Name:</strong> {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>tel:</strong> {user.tel}</p>
              <div>
                {' '}
                <Link to={`/editProfile/${user._id}`}><Button variant="warning" size='md'>Edit</Button></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    </div>
    
  );
};

export default Profile;
