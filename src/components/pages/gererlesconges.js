import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function GestionDemandesConge() {
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    fetchDemandesConge();
  }, []);

  const fetchDemandesConge = async () => {
    try {
      const response = await fetch('http://localhost:3001/conges');
      if (response.ok) {
        const data = await response.json();
        setDemandes(data);
      } else {
        console.error('Erreur lors de la récupération des demandes de congé:', response.status);
      }
    } catch (error) {
      console.error('Erreur réseau ou serveur:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/conges/${id}`, {
        method: 'POST',
      });
      if (response.ok) {
        fetchDemandesConge();
        alert('La demande de congé a été accepté avec succès.');
      } else {
        console.error('Erreur lors de l\'approbation de la demande de congé:', response.status);
      }
    } catch (error) {
      console.error('Erreur réseau ou serveur lors de l\'approbation de la demande de congé:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/conges/${id}`, {
        method: 'POST',
      });
      if (response.ok) {
        // Mettre à jour les demandes après le rejet
        fetchDemandesConge();
        alert('La demande de congé a été refusé.');
      } else {
        console.error('Erreur lors du rejet de la demande de congé:', response.status);
      }
    } catch (error) {
      console.error('Erreur réseau ou serveur lors du rejet de la demande de congé:', error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="ml-auto">
          <Link to="/InterfaceRH"><button id="sub_home" className='btn btn-secondary'>InterfaceRH</button></Link>
        </div>
      </nav>
      <div className="container mt-4">
        <h2 className="container-fluid d-flex align-items-center justify-content-center font-weight-bold">Liste des demandes de congé</h2>
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{ height: "50vh" }}>
        <table className="table">
          <thead>
            <tr>
              <th>CIN</th>
              <th>Username</th>
              <th>Date de début</th>
              <th>Date de fin</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map(demande => (
              <tr key={demande._id}>
                <td>{demande.CIN}</td>
                <td>{demande.Username}</td>
                <td>{demande.dateDebut}</td>
                <td>{demande.dateFin}</td>
                <td>{demande.description}</td>
                <td>
                  <button className="btn btn-success mr-2" onClick={() => handleApprove(demande._id)}>accepté</button>
                  <button className="btn btn-danger" onClick={() => handleReject(demande._id)}>refuser</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

export default GestionDemandesConge;


