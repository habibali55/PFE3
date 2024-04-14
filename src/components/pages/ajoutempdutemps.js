import React, { useState } from 'react';
import axios from 'axios';

const AjouterEmploiDuTemps = () => {
  const [formData, setFormData] = useState({
    lundi: '',
    mardi: '',
    mercredi: '',
    jeudi: '',
    vendredi: '',
    numSemaine: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/ajouter-emploi-du-temps', formData);
      alert('Emploi du temps ajouté avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'emploi du temps :', error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="container mt-4 border rounded p-4"  style={{backgroundColor: '#87CEEB', maxWidth: '500px'}}>
         <h2 className='text-center font-weight-bold'> Ajouter Emploi du Temps pour un Employé</h2>
        <div className="form-group">
        <label className=' font-weight-bold'>
          Lundi:
          <input type="text" className="form-control " name="lundi" value={formData.lundi} onChange={handleChange} required />
        </label>
        </div>
        <div className="form-group">
        <label className=' font-weight-bold'>
          Mardi:
          <input type="text" className="form-control " name="mardi" value={formData.mardi} onChange={handleChange} required />
        </label>
        </div>
        <div className="form-group">
        <label className=' font-weight-bold'>
          Mercredi:
          <input type="text" className="form-control " name="mercredi" value={formData.mercredi} onChange={handleChange} required />
        </label>
        </div>
        <div className="form-group">
        <label className=' font-weight-bold'>
          Jeudi:
          <input type="text" className="form-control " name="jeudi" value={formData.jeudi} onChange={handleChange} required />
        </label>
        </div>
        <div className="form-group">
        <label className=' font-weight-bold'>
          Vendredi:
          <input type="text" className="form-control " name="vendredi" value={formData.vendredi} onChange={handleChange} required />
        </label>
        </div>
        <div className="d-flex justify-content-center">
           <button className="btn btn-primary" type="submit">Ajouter Emploi du Temps</button>
           </div>
      </form>
    
    </div>
  );
};

export default AjouterEmploiDuTemps; 