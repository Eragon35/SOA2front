import React, {useEffect, useMemo, useState} from "react";
import { useTable } from 'react-table'
import axios from "axios";
import styled from 'styled-components'




export default function Patients() {
    const url = "http://localhost:9000/patients/?doctorId=" + localStorage.getItem("doctorId")

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

    const [loadingData, setLoadingData] = useState(true);

    const columns = useMemo(
        () => [
            {
                Header: 'List of smokers',
                columns: [
                    // {
                    //     Header: 'Id',
                    //     accessor: 'id',
                    // },
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

    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            await axios
                .get(url)
                .then((response) => {
                    // check if the data is populated
                    console.log(response.data);
                    setData(response.data);
                    // you tell it that you had the result
                    setLoadingData(false);
                });
        }
        if (loadingData) {
            // if the result is not ready so you make the axios call
            getData();
        }
    }, [loadingData, url]);


    // TODO: add links to row to this smoker
    return (
        <main style={{ padding: "1rem 0" }}>
            <div>
                <h2>Patients:</h2>
                {loadingData ? (
                    <p>Loading Please wait...</p>
                ) : (
                    <Styles>
                        <Table columns={columns} data={data} />
                    </Styles>
                )}
            </div>
        </main>
    );
}