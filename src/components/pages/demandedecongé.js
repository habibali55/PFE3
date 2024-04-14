import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function DemandeDeCongé() {
  const [CIN, setCIN] = useState('');
  const [Username, setUsername] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      CIN,
      Username,
      dateDebut,
      dateFin,
      description,
    };

    try {
      // Envoyer la requête POST avec les données du formulaire
      const response = await fetch('http://localhost:3001/conges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Si la réponse est OK (200)
      if (response.ok) {
        console.log('Données envoyées avec succès.');
        // Réinitialiser les champs du formulaire après la soumission
        setCIN('');
        setUsername('');
        setDateDebut('');
        setDateFin('');
        setDescription('');
      } else {
        // Gérer les erreurs de réponse (autre que 200)
        console.error('Erreur lors de l\'envoi des données:', response.status);
      }
    } catch (error) {
      // Gérer les erreurs de réseau ou de serveur
      console.error('Erreur réseau ou serveur:', error);
    }
  };

  return (
    <div>
    <nav className="navbar navbar-dark bg-dark">
        <div className="ml-auto">
        <Link to="/interfaceEmp"><button id="sub_home" className='btn btn-secondary'>interfaceEmp</button></Link>
        </div>
        </nav>
    <form onSubmit={handleSubmit} className="container mt-4 border rounded p-4"  style={{backgroundColor: '#87CEEB', maxWidth: '500px'}}> 
      <h2 className='text-center font-weight-bold'>Demande de congé</h2>
      <div className="form-group">
        <label className=' font-weight-bold'>CIN :</label>
        <input
          type="text"
          className="form-control"
          value={CIN}
          onChange={(e) => setCIN(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className=' font-weight-bold'>Username :</label>
        <input
          type="text"
          className="form-control"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      d'aprés cette code :   <div className="form-group">
        <label className=' font-weight-bold'>Date de début de congé :</label>
        <input
          type="date"
          className="form-control"
          value={dateDebut}
          onChange={(e) => setDateDebut(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className=' font-weight-bold'>Date de fin de congé :</label>
        <input
          type="date"
          className="form-control"
          value={dateFin}
          onChange={(e) => setDateFin(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className=' font-weight-bold'>Description :</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="d-flex justify-content-center">
      <button type="submit" className="btn btn-primary" >Envoyer</button>
      </div>
    </form>
    </div>
  );
}

export default DemandeDeCongé;

