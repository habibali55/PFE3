import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Gereremploidutemps = () => {
  const [employeesduTemps, setEmployeesduTemps] = useState([]);
 

  useEffect(() => {
    const fetchEmployesdutemps = async () => {
      try {
        const response = await axios.get('http://localhost:3001/employees');
        setEmployeesduTemps(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'emploi du temps des employés :', error);
      }
    };

    fetchEmployesdutemps();
  }, []);

  const archiverEmploye = async (employeeId) => {
    try {
      await axios.post(`http://localhost:3001/employees/${employeeId}/archive`);
      // Mettre à jour localement pour refléter les changements
      setEmployeesduTemps(prevEmployees => prevEmployees.filter(employee => employee._id !== employeeId));
      console.log('Employé archivé avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'archivage de l\'employé :', error);
    }
  };
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="ml-auto">
          <Link to="/InterfaceRH"><button id="sub_home" className='btn btn-secondary'>interfaceRH</button></Link>
        </div>
      </nav>
      <h2 className="container-fluid d-flex align-items-center justify-content-center font-weight-bold">Emploi du temps</h2>
      <Fragment>
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{ height: "50vh" }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Lundi</th>
                <th scope="col">Mardi</th>
                <th scope="col">Mercredi</th>
                <th scope="col">Jeudi</th>
                <th scope="col">Vendredi</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employeesduTemps.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.lundi}</td>
                  <td>{employee.mardi}</td>
                  <td>{employee.mercredi}</td>
                  <td>{employee.jeudi}</td>
                  <td>{employee.vendredi}</td>
                  <td>
                    <Link to={`/modifier-emploi-du-temps/${employee._id}`}>
                      <button className="btn btn-primary mr-2">Modifier</button>
                    </Link>
                    <button className="btn btn-danger" onClick={() => archiverEmploye(employee._id)}>Archiver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center">
        <Link to="/ajouter-emploi-du-temps"><button className='btn btn-primary'>Ajouter Emploi du Temps</button></Link>
        </div>
      </Fragment>
    </div>
  );
}

export default Gereremploidutemps; 