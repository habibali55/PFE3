import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import axios from 'axios';

const FormationsPage = () => {
  const [formations, setFormations] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState(null);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/formation');
        setFormations(response.data);
      } catch (error) {
        console.error('Error fetching formations:', error);
      }
    };

    fetchFormations();
  }, []);
  const handleSelectFormation = useCallback(async (formationId) => {
    setSelectedFormation(formationId === selectedFormation ? null : formationId);
  }, [selectedFormation]);

  const sendSelectedFormation = async () => {
    try {
     await axios.post('http://localhost:3001/Formation', { selectedFormation });
      alert('Formation sélectionnée est enregistrée avec succès.');
    } catch (error) {
      console.error('Error sending selected formation:', error);
      alert('Erreur lors de l\'envoi de la formation sélectionnée.');
    }
  };
  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/formation/:id');
        setFormations(response.data);
      } catch (error) {
        console.error('Error fetching formations:', error);
      }
    };

    fetchFormations();
  }, []);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Nom de formateur',
        accessor: 'nomDeFormateur',
      },
      {
        Header: 'Formation',
        accessor: 'Formation',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Prix',
        accessor: 'prix',
      },
      {
        Header: 'Sélectionner',
        accessor: 'id',
        Cell: ({ row }) => (
          <Fragment>
            <input
              type="radio"
              name="selectedFormation"
              checked={row.original.id === selectedFormation}
              onChange={() => handleSelectFormation(row.original.id)}
            />
          </Fragment>
        ),
      }
    ],
    [handleSelectFormation, selectedFormation]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: formations });

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="ml-auto">
          <Link to="/interfaceEmp"><button id="sub_home" className='btn btn-secondary'>interfaceEmp</button></Link>
        </div>
      </nav>
      <h2 className="container-fluid d-flex align-items-center justify-content-center font-weight-bold">Liste des Formations</h2>
      <Fragment>
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{ height: "50vh" }}>
          <div className="row">
            <div className="col">
              <table {...getTableProps()} className="table">
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className={row.original.id === selectedFormation ? 'selected' : ''}>
                        {row.cells.map(cell => {
                          return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="container-fluid d-flex align-items-center justify-content-center">
          <button onClick={sendSelectedFormation} className="btn btn-primary">
            Sélectionner
          </button>
        </div>
      </Fragment>
    </div>
  );
}

export default FormationsPage;