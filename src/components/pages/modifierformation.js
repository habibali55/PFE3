// React component to modify a formation
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Modifierformation = () => {
  const { id } = useParams();
  const [formationsData, setFormationsData] = useState({
    nomDeFormateur: '',
    Formation: '',
    description: '',
    prix: ''
  });

  useEffect(() => {
    const fetchFormationData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/formation/${id}`);
        const { nomDeFormateur, Formation, description, prix } = response.data;
        setFormationsData({
          nomDeFormateur: nomDeFormateur || '',
          Formation: Formation || '',
          description: description || '',
          prix: prix || ''
        });
      } catch (error) {
        console.error('Error fetching formation data:', error);
      }
    };

    fetchFormationData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormationsData({ ...formationsData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/modifier-formation/${id}`, formationsData);
      alert('Formation updated successfully!');
    } catch (error) {
      console.error('Error updating formation data:', error);
      alert('Failed to update formation. Please try again.');
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">Modification</span>
        <div className="ml-auto">
          <Link to="/profile"><Button variant="secondary">Cancel</Button></Link>
        </div>
      </nav>
      <div className="container-fluid d-flex align-items-center justify-content-center " style={{ height: "100vh" }}>
        <div className="row">
          <div className="col">
            <h2 className="text-center font-weight-bold mb-5">Modification in the formation</h2>
            <Form onSubmit={handleSubmit} className="container mt-3 border rounded p-3" style={{ backgroundColor: '#87CEEB', maxWidth: '400px' }}>
              <Form.Group controlId="nomDeFormateur">
                <div className="form-group">
                  <Form.Label className=' font-weight-bold'>Nom De Formateur:</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    name="nomDeFormateur"
                    value={formationsData.nomDeFormateur}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Form.Group>
              <Form.Group controlId="Formation">
                <div className="form-group">
                  <Form.Label className=' font-weight-bold'>Formation:</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    name="Formation"
                    value={formationsData.Formation}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Form.Group>
              <Form.Group controlId="description">
                <div className="form-group">
                  <Form.Label className=' font-weight-bold'>Description:</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    name="description"
                    value={formationsData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Form.Group>
              <Form.Group controlId="prix">
                <div className="form-group">
                  <Form.Label className=' font-weight-bold'>Prix:</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    name="prix"
                    value={formationsData.prix}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Form.Group>
              <div className='d-flex justify-content-center mt-3'></div>
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

export default Modifierformation;
