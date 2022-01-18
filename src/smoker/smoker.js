import React, {useEffect, useMemo, useState} from "react";
import { useTable } from 'react-table'
import axios from "axios";
import styled from 'styled-components'




export default function Smoker() {
    const smokerURL = "http://localhost:9000/smoker/?smokerId=" + localStorage.getItem("smokerId")
    const relativesURL = "http://localhost:9000/relatives/?smokerId=" + localStorage.getItem("smokerId")
    const punishmentsURL = "http://localhost:9000/punishments/?smokerId=" + localStorage.getItem("smokerId")

    const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
    `

    function Table({ columns, data }) {
        // Use the state and functions returned from useTable to build your UI
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
        } = useTable({
            columns,
            data,
        })
        console.log("data inside Table", data)
        // Render the UI for your table
        return (
            <table {...getTableProps()}>
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
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }

    const [loadingSmokerData, setLoadingSmokerData] = useState(true);
    const [loadingPunishmentsData, setLoadingPunishmentsData] = useState(true);
    const [loadingRelativesData, setLoadingRelativesData] = useState(true);

    const punishmentColumns = useMemo(
        () => [
            {
                Header: 'Punishments',
                columns: [
                    {
                        Header: 'Type of punishment',
                        accessor: 'punishment',
                    },
                    {
                        Header: 'Victim First Name',
                        accessor: 'victimFirstName',
                    },
                    {
                        Header: 'Victim Last Name',
                        accessor: 'victimLastName',
                    },
                ]
            }
        ], []
    )

    const relativesColumns = useMemo(
        () => [
            {
                Header: 'Relatives',
                columns: [
                    {
                        Header: 'First Name',
                        accessor: 'firstName',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'lastName',
                    },
                    {
                        Header: 'Relationship',
                        accessor: 'relationship',
                    },
                ]
            }
        ], []
    )

    const [smokerData, setSmokerData] = useState([]);
    const [punishmentsData, setPunishmentsData] = useState([]);
    const [relativesData, setRelativesData] = useState([]);

    useEffect(() => {
        async function getSmokerData() {
            await axios
                .get(smokerURL)
                .then((response) => {
                    // check if the data is populated
                    console.log('Smoker', response.data);
                    setSmokerData(response.data);
                    // you tell it that you had the result
                    setLoadingSmokerData(false);
                });
        }
        async function getPunishmentsData() {
            await axios
                .get(punishmentsURL)
                .then((response) => {
                    // check if the data is populated
                    console.log('Punishments', response.data);
                    setPunishmentsData(response.data);
                    // you tell it that you had the result
                    setLoadingPunishmentsData(false);
                });
        }
        async function getRelativesData() {
            await axios
                .get(relativesURL)
                .then((response) => {
                    // check if the data is populated
                    console.log('Relatives', response.data);
                    setRelativesData(response.data);
                    // you tell it that you had the result
                    setLoadingRelativesData(false);
                });
        }
        if (loadingSmokerData) getSmokerData();
        if (loadingRelativesData) getRelativesData();
        if (loadingPunishmentsData) getPunishmentsData();
    }, []);


    // TODO: add links to row to this smoker
    return (
        <main style={{ padding: "1rem 0" }}>
            <div>
                {loadingSmokerData ? (
                    <h2>Patient: Loading Please wait...</h2>
                ) : (
                    <div>
                        <h2>Patient: {smokerData.firstName} {smokerData.lastName} </h2>
                        <h3>Number of accidents: {smokerData.numberOfAccidents}</h3>
                    </div>
                )}
                {loadingRelativesData ? (
                    <p>Loading Relatives Please wait...</p>
                ) : (
                    <Styles>
                        <Table columns={relativesColumns} data={relativesData} />
                    </Styles>
                )}
                {loadingPunishmentsData ? (
                    <p>Loading Punishments Please wait...</p>
                ) : (
                    <Styles>
                        <Table columns={punishmentColumns} data={punishmentsData} />
                    </Styles>
                )}
            </div>
        </main>
    );
}