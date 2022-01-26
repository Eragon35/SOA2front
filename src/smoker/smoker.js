import React, {useEffect, useMemo, useState} from "react";
import { useTable } from 'react-table'
import axios from "axios";
import styled from 'styled-components'
import Select from 'react-select'


import {ObservationForm} from './ObservationForm'




export default function Smoker() {
    const smokerURL = "http://localhost:9000/smoker/?smokerId=" + localStorage.getItem("smokerId")
    const relativesURL = "http://localhost:9000/relatives/?smokerId=" + localStorage.getItem("smokerId")
    const punishmentsURL = "http://localhost:9000/punishment/?smokerId=" + localStorage.getItem("smokerId")
    const observationURL = "http://localhost:9000/observation/?smokerId=" + localStorage.getItem("smokerId")

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
    const [loadingObservationData, setLoadingObservationData] = useState(true);

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

    const observationColumns = useMemo(
        () => [
            {
                Header: 'Observation schedule',
                columns: [
                    {
                        Header: 'Start',
                        accessor: 'start',
                    },
                    {
                        Header: 'Finish',
                        accessor: 'finish',
                    },
                    {
                        Header: 'Hours per day',
                        accessor: 'hoursPerDay',
                    },
                ]
            }
        ], []
    )

    const [smokerData, setSmokerData] = useState([]);
    const [punishmentsData, setPunishmentsData] = useState([]);
    const [relativesData, setRelativesData] = useState([]);
    const [observationData, setObservationData] = useState([]);

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
                    setRealativesOptions(response.data)
                    // you tell it that you had the result
                    setLoadingRelativesData(false);
                });
        }
        async function getObservationData() {
            await axios
                .get(observationURL)
                .then((response) => {
                    // check if the data is populated
                    console.log('Observation', response.data);
                    setObservationData(response.data);
                    // you tell it that you had the result
                    setLoadingObservationData(false);
                });
        }
        if (loadingSmokerData) getSmokerData();
        if (loadingRelativesData) getRelativesData();
        if (loadingPunishmentsData) getPunishmentsData();
        if (loadingObservationData) getObservationData();
    }, []);

    const relativesOptions = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    function setRealativesOptions(data) {
        data.forEach(x => relativesOptions.push(x.id, x.firstName + x.lastName))
    }




    // TODO: add links to row to this smoker
    return (
        <main style={{ padding: "1rem 0" }}>
            <div>
                {loadingSmokerData ? (
                    <h2>Patient: Loading information please wait...</h2>
                ) : (
                    <Styles>
                        <div>
                            <h2>{smokerData.firstName} {smokerData.lastName} </h2>
                            <h3>Number of accidents: {smokerData.numberOfAccidents}</h3>
                        </div>
                    </Styles>
                )}

                {loadingObservationData ? (
                    <p>Loading Observation schedule information please wait...</p>
                ) : (
                    <Styles>
                        <Table columns={observationColumns} data={observationData} />
                        <ObservationForm/>
                    </Styles>
                )}

                {loadingPunishmentsData ? (
                    <p>Loading Punishments information please wait...</p>
                ) : (
                    <Styles>
                        <Table columns={punishmentColumns} data={punishmentsData} />
                        <Select options={relativesOptions} />
                    </Styles>
                )}

                {loadingRelativesData ? (
                    <p>Loading Relatives information please wait...</p>
                ) : (
                    <Styles>
                        <Table columns={relativesColumns} data={relativesData} />
                    </Styles>
                )}
            </div>
        </main>
    );
}