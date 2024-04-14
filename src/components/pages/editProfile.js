import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    CIN: '',
    tel: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${id}`);
        const { firstName, lastName, email, CIN, tel } = response.data;
        setUserData({
          firstName: firstName || '',
          lastName: lastName || '',
          email: email || '',
           CIN: CIN || '',  
          tel : tel || ''
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/users/${id}`, userData);
      alert('User data updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div>
    <nav className="navbar navbar-dark bg-dark">
    <span className="navbar-brand mb-0 h1">modification</span>
    <div className="ml-auto">
    <Link to="/profile"><Button variant="secondary">Cancel</Button></Link>
    </div>
    </nav>
    <div className="container-fluid d-flex align-items-center justify-content-center " style={{ height: "100vh" }}>
        <div className="row">
           <div className="col">
      <h2 className="text-center font-weight-bold mb-5">modification in your Profile</h2>
      <Form onSubmit={handleSubmit} className="container mt-3 border rounded p-3"  style={{backgroundColor: '#87CEEB', maxWidth: '400px'}}>
        <Form.Group controlId="firstName">
        <div className="form-group">
          <Form.Label className=' font-weight-bold'>First Name:</Form.Label>
          <Form.Control
            type="text"
            className="form-control"  
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            required
          />   </div>
        </Form.Group> 
        <Form.Group controlId="lastName">
        <div className="form-group">
          <Form.Label className=' font-weight-bold'>Last Name:</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            required
          />
          </div>
        </Form.Group>
        <Form.Group controlId="email">
        <div className="form-group">
          <Form.Label className=' font-weight-bold'>Email:</Form.Label>
          <Form.Control
            type="email"
            className="form-control"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          </div>
        </Form.Group>
        <Form.Group controlId="CIN">
        <div className="form-group">
          <Form.Label className=' font-weight-bold'>CIN:</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            name="CIN"
            value={userData.CIN}
            onChange={handleChange}
            required
          />
          </div>
        </Form.Group>
        <Form.Group controlId="tel">
          <div className="form-group">
          <Form.Label className=' font-weight-bold'>Tel:</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            name="tel"
            value={userData.tel}
            onChange={handleChange}
          />
          </div>
        </Form.Group>
        <div className='d-flex justify-content-center mt-3'>
          {' '}
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">Save Changes</Button>
        </div>
      </Form>
    </div>
    </div>
    </div>
    </div>
  );
};

export default EditProfile;
