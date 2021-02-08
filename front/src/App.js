import React, {useEffect, useState } from "react";
import {  useTable } from 'react-table'
import styled from 'styled-components'

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
  }
`

function App() {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");


    useEffect(() => {
        fetch(`/api?page=${page}&search=${search}`).then(data => { return data.json() }).then((values)=>{
            setData(values);
        });
    }, [page, search]);


    const columns = React.useMemo(
        () => [

            {
                Header: 'Region',
                accessor: 'Region',
            },
            {
                Header: 'Country',
                accessor: 'Country',
            },

            {
                Header: 'Item Type',
                accessor: 'Item_Type',
            },
            {
                Header: 'Sales Channel',
                accessor: 'Sales_Channel',
            },
            {
                Header: 'Order Priority',
                accessor: 'Order_Priority',
            },
            {
                Header: 'Order Date',
                accessor: 'Order_Date',
            },
            {
                Header: 'Order ID',
                accessor: 'Order_ID',
            },
            {
                Header: 'Ship Date',
                accessor: 'Ship_Date',
            },
            {
                Header: 'Units Sold',
                accessor: 'Units_Sold',
            },
            {
                Header: 'Unit Price',
                accessor: 'Unit_Price',
            },
            {
                Header: 'Unit Cost',
                accessor: 'Unit_Cost',
            },
            {
                Header: 'Total Revenue',
                accessor: 'Total_Revenue',
            },
            {
                Header: 'Total Cost',
                accessor: 'Total_Cost',
            },
            {
                Header: 'Total Profit',
                accessor: 'Total_Profit',
            },
              ],
        []
    )


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    });



    return (
        <Styles>
            <>
                <div className="pagination">
                    <button onClick={() => setPage(0)} disabled={page===0}>
                        {"First"}
                    </button>{" "}
                    <button onClick={() => setPage(page-1)} disabled={page===0}>
                        {"<"}
                    </button>{" "}
                    <button onClick={() => setPage(page+1)}>
                        {">"}
                    </button>{" "}
                    <input onChange={(event) => {setSearch(event.target.value)}}/>
                </div>
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

            </>
        </Styles>
    )

}

export default App
