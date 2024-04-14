import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const NouvelleOptionTableau = () => {
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
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
        <div className="ml-auto">
        <Link to="/interfaceEmp"><button id="sub_home" className='btn btn-secondary'>interfaceEmp</button></Link>
        </div>
        </nav>
        <h2 className="container-fluid d-flex align-items-center justify-content-center font-weight-bold">Liste des congé</h2>
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{ height: "40vh" }}>
        <table className="table">
            <thead>
                <tr>
                    <th>CIN</th>
                    <th>Username</th>
                    <th>Date de début</th>
                    <th>Date de fin</th>
                    <th>Description</th>
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
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </div>
    );
};

export default NouvelleOptionTableau;

