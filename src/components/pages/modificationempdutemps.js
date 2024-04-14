import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Modificationemploidutemps = () => {
  const { id } = useParams();
  const [employeeData, setemployeeData] = useState({
    lundi: '',
    mardi: '',
    mercredi: '',
    jeudi: '',
    vendredi:''
  });

  useEffect(() => {
    const fetchemployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/employees/${id}`);
        const {lundi, mardi, mercredi,jeudi,vendredi } = response.data;
        setemployeeData({
            lundi: lundi || '',
            mardi: mardi ||'',
            mercredi: mercredi || '',
            jeudi: jeudi || '',
            vendredi: vendredi || ''
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchemployeeData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setemployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/modifier-emploi-du-temps/${id}`, employeeData);
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
      <h2 className="text-center font-weight-bold mb-5">modification dans l'emploi du temps</h2>
      <Form onSubmit={handleSubmit} className="container mt-3 border rounded p-3"  style={{backgroundColor: '#87CEEB', maxWidth: '400px'}}>
        <Form.Group controlId="lundi">
        <div className="form-group">
          <Form.Label className=' font-weight-bold'>lundi:</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            name="lundi"
            value={employeeData.lundi}
            onChange={handleChange}
            required
          />
          </div>
        </Form.Group>
        <Form.Group controlId="mardi">
        <div className="form-group">
          <Form.Label className=' font-weight-bold'>mardi:</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            name="mardi"
            value={employeeData.mardi}
            onChange={handleChange}
            required
          />
          </div>
        </Form.Group>
        <Form.Group controlId="mercredi">
        <div className="form-group">
          <Form.Label className=' font-weight-bold'>mercredi:</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            name="mercredi"
            value={employeeData.mercredi}
            onChange={handleChange}
            required
          />
          </div>
        </Form.Group>
        <Form.Group controlId="jeudi">
          <div className="form-group">
          <Form.Label className=' font-weight-bold'>jeudi:</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            name="jeudi"
            value={employeeData.jeudi}
            onChange={handleChange}
          />
          </div>
        </Form.Group>
        <Form.Group controlId="vendredi">
          <div className="form-group">
          <Form.Label className=' font-weight-bold'>vendredi:</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            name="vendredi"
            value={employeeData.vendredi}
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

export default Modificationemploidutemps;
