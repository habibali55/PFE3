import React, { useState } from 'react';
import axios from 'axios';

const Ajouterformation = () => {
  const [formationData, setFormationData] = useState({
    nomDeFormateur: '',
    Formation: '',
    description: '', 
    prix: ''
  });

  const handleChange = (e) => {
    setFormationData({ ...formationData, [e.target.name]: e.target.value });
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formationData);
        await axios.post('http://localhost:3001/ajouter-formations', formationData);
      alert('Formation ajoutée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la formation :', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="container mt-4 border rounded p-4"  style={{backgroundColor: '#87CEEB', maxWidth: '500px'}}>
         <h2 className='text-center font-weight-bold'> Ajouter une formation</h2>
         <div className="form-group">
          <label htmlFor="nomduformateur" className='font-weight-bold'>Nom De Formateur:</label>
          <input type="text" id="nomDeFormateur" className="form-control" name="nomDeFormateur" value={formationData.nomDeFormateur} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="nomdeformation" className='font-weight-bold'>Formation:</label>
          <input type="text" id="Formation" className="form-control" name="Formation" value={formationData.nomDeFormation} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description" className='font-weight-bold'>Description:</label>
          <input type="text" id="description" className="form-control" name="description" value={formationData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="prix" className='font-weight-bold'>Prix:</label>
          <input type="text" id="prix" className="form-control" name="prix" value={formationData.prix} onChange={handleChange} required />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">Ajouter formation</button>
        </div>
      </form>
    </div>
  );
};

export default Ajouterformation;
