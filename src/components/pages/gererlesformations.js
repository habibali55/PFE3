import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Gererlesformations = () => {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/formation');
        // Filter out empty formations
        const filteredFormations = response.data.filter(formation => (
          formation['nomDeFormateur'] || formation['Formation'] || formation['description'] || formation['prix']
        ));
        setFormations(filteredFormations);
      } catch (error) {
        console.error('Erreur lors de la récupération des formations :', error);
      }
    };
  
    fetchFormations();
  }, []);

  const archiverFormation = async (formationId) => {
    try {
      await axios.post(`http://localhost:3001/formation/${formationId}/archive`);
      // Mettre à jour localement pour refléter les changements
      setFormations(prevFormations => prevFormations.filter(formation => formation._id !== formationId));
      console.log('Formation archivée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'archivage de la formation :', error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="ml-auto">
          <Link to="/InterfaceRH"><button id="sub_home" className='btn btn-secondary'>InterfaceRH</button></Link>
        </div>
      </nav>
      <h2 className="container-fluid d-flex align-items-center justify-content-center font-weight-bold">Formations</h2>
      <Fragment>
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{ height: "50vh" }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nom de formateur</th>
                <th scope="col">Formation</th>
                <th scope="col">Description</th>
                <th scope="col">Prix</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {formations.map((formation, index) => (
                <tr key={index}>
                  <td>{formation.nomDeFormateur}</td>
                  <td>{formation.Formation}</td>
                  <td>{formation.description}</td>
                  <td>{formation.prix}</td>
                  <td>
                    <Link to={`/modifier-formation/${formation._id}`}>
                      <button className="btn btn-primary mr-2">Modifier</button>
                    </Link>
                    <button className="btn btn-danger" onClick={() => archiverFormation(formation._id)}>Archiver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center">
        <Link to="/ajouter-formation"><button className='btn btn-primary'>Ajouter Formation</button></Link>
        </div>
      </Fragment>
    </div>
  );
}

export default Gererlesformations;

