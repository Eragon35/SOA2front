import {Link} from "react-router-dom";
import React, {useState} from "react";
// import {chakra, Container, Grid, List, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
// import patientsTable from "./PatientsTable"
import {Table, Thead, Tbody, Tr, Th, Td, chakra} from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import axios from "axios";
import styled from 'styled-components'

function Header(props) {
    return null;
}

export default function Patients() {
    const [states, setstate] = useState([]);
    const url = "http://localhost:9000/patients/?doctorId=" + localStorage.getItem("doctorId")
    let table = [];

    function setTable(data) {
        table = data
        console.log("table")
        console.log(table)
    }

    axios.get(url).then(response =>
        setTable(response.data)
    )

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
                {rows.map((row, i) => {
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

    const columns = React.useMemo(
        () => [
            {
                Header: 'List of smokers',
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
                        Header: 'Number of accidents',
                        accessor: 'numberOfAccidents'
                    }
                ]
            }
        ], []
    )


                return (
        <main style={{ padding: "1rem 0" }}>
            <div>
                <h2>Patients:</h2>
                {/*<table border={2} cellPadding={5}>*/}
                {/*    <thead>*/}
                {/*    <tr>*/}
                {/*        <td>First name</td>*/}
                {/*        <td>Last name</td>*/}
                {/*        <td>Number of accidents</td>*/}
                {/*    </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody>*/}
                {/*    </tbody>*/}
                {/*</table>*/}
                <Styles>
                    <Table columns={columns} data={table} />
                </Styles>
            </div>
        </main>
    );
}