import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table'; 
import axios from 'axios';

const Emploidutemps = () => {
  const [employeesduTemps, setEmployeesduTemps] = useState([]);

  useEffect(() => {
    const fetchEmployesdutemps = async () => {
      try {
        const response = await axios.get('http://localhost:3001/employees'); 
        setEmployeesduTemps(response.data);
      } catch (error) {
        console.error('Error fetching employees schedule:', error);
      }
    };

    fetchEmployesdutemps(); // Call the function here
  }, []); // Empty dependency array ensures the effect runs only once after mounting

  const columns = React.useMemo(
    () => [
      {
        Header: 'Lundi',
        accessor: 'lundi',
      },
      {
        Header: 'Mardi',
        accessor: 'mardi',
      },
      {
        Header: 'Mercredi',
        accessor: 'mercredi',
      },
      {
        Header: 'Jeudi',
        accessor: 'jeudi',
      },
      {
        Header: 'Vendredi',
        accessor: 'vendredi',
      }
    ],
    []
  );

  // Use useTable hook to create a table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: employeesduTemps });

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="ml-auto">
          <Link to="/interfaceEmp"><button id="sub_home" className='btn btn-secondary'>interfaceEmp</button></Link>
        </div>
      </nav>
      <h2 className="container-fluid d-flex align-items-center justify-content-center font-weight-bold">Emploi du temps</h2>
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
                      <tr {...row.getRowProps()}>
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
      </Fragment>
    </div>
  );
} 

export default Emploidutemps;

