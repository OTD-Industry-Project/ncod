import React, { useMemo, useState } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import "./Sidebar.css";
import { Filter } from "./Filter";
import { FiRefreshCw } from "react-icons/fi";

/** @module Table */

/**
 * @function getTime
 * @param {date} value Datetime object 
 * @returns {Component} Stringified local time in 24 hour format
 */
export const getTime = (value) => {
    const time = new Date(value);
    return <>{time.toLocaleTimeString([], { hour12: false })}</>;
};


/**
 * @function Table
 * @param {Object} schedule Raw schedule data
 * @param {callback} activeCallBack Update state of activeBus in parent component
 * @param {Object} activeBus An entry from the schedule that represents on vehicle 
 * @returns {Component} A functional table with styling and sort/search features
 */
export const Table = ({ schedule, activeCallBack, activeBus }) => {
    
    // Used to map schedule data to Headers in order to build table
    const COLUMNS = [
        {
            Header: "Status",
            accessor: "status",
        },
        {
            Header: "ID",
            accessor: "vehicle_id",
        },
        {
            Header: "Dest.",
            accessor: "destination",
        },
        {
            Header: "From",
            accessor: "pickup_time",
            // Format time into human readable format
            Cell: ({ cell: { value } }) => getTime(value),
        },
        {
            Header: "To",
            accessor: "destination_time",
            // Format time into human readable format
            Cell: ({ cell: { value } }) => getTime(value),
        },
    ];

    // Load all vehicles to sidebar
    const NUM_OF_VEHICLES = schedule.length;

    // Keep track of last updated. Will be more useful when we are pulling live GPS data
    // eslint-disable-next-line no-unused-vars
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [selectedRow, setSelectedRow] = useState(null);

    /**
     * Essentially an event handler that sets the activeBus of the row that is selected.
     * @function handleEvent
     * @param {Object} row Object containing schedule data from a particular entry 
     * @param {number} i Index of row in Schedule 
     *  
     */
    const handleEvent = (row, i) => {
        activeCallBack(row.job_id);

        if (row.job_id === selectedRow) {
            setSelectedRow(null);
            return;
        }

        
        setSelectedRow(row.job_id);
        
    };

    // Memoize the columns and data for the table.
    // This is essentially caching all the data, so react doesn't need to rebuild the data and columns on every refresh.

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const columns = useMemo(() => COLUMNS, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const data = useMemo(() => schedule.slice(0, NUM_OF_VEHICLES), [schedule]);

    // Create a table instance with useTable hook provided by the React-Table package
    // We are passing in colums and data, as well as Filter and Sorting functions
    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy
    );

    // Destructure all the properties and methods we need that the useTable hook gives us to work with
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = tableInstance;

    // Destructure the globalFilter state
    const { globalFilter } = state;

    return (
        <>
            {/* Input field and Last Updated */}
            <div className="Top mt-3 container-fluid d-flex justify-content-between">
                <Filter
                    className="Search"
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                />
                <div className="text-secondary align-self-center small">
                    {`Last Updated: ${lastUpdated.toLocaleTimeString([], {
                        hour12: false,
                    })}`}{" "}
                    <FiRefreshCw
                        className="refresh"
                        aria-label="refresh"
                        onClick={() => window.location.reload(false)}
                    />{" "}
                </div>
            </div>

            {/* Table starts here. the ...getSomethingProps() methods are essentially returning an array of props that
                React-table uses to build the table */}
            <table className="table" {...getTableProps()}>
                {/* Table Header */}
                <thead>
                    {/* Here we are mapping a new table Row for each HeaderGroup. In our case, there is
                        only one Header group, but this allows to add more and it won't affect functionality */}
                    {headerGroups.map((headerGroup) => (
                        // Apply props to each header row
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {/* Map each column of the header to a th Cell. This is where the render() method is finally called.
                            This is also where we enable React-table's sort functionality and apply to each column*/}
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.render("Header")}

                                    {/* Conditionally insert the little sort arrows */}
                                    <span>
                                        {/* A nested ternary statement. Essentially this is a one-liner of this:
                                            if isSorted:
                                                if isSortedDesc:
                                                    print up arrow
                                                else:
                                                    print down arrow
                                            else:
                                                print nothing
                                        */}
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? " ▼"
                                                : " ▲"
                                            : "  "}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                {/* Get and apply table body props */}
                <tbody {...getTableBodyProps()}>
                    {/* Iterate over every row */}
                    {rows.map((row, i) => {
                        // React-table function that prepares the row to be iterated over and displayed
                        prepareRow(row);

                        return (
                            // Get and apply row props
                            <tr
                                key={i}
                                onClick={() => handleEvent(row.original, i)}
                                className={selectedRow && selectedRow === row.original.job_id && activeBus !== null ? "selected" : ""}
                                {...row.getRowProps()}
                            >
                                {/* Iterate over each cell in the row and return the rendered cell */}
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>

                {/* Custom footer. Ract-table is not involved with this bit */}
                <tfoot>
                    <tr>
                        <td
                            className="text-center h6 p-1"
                            colSpan="6"
                        >{`Total Vehicles: ${NUM_OF_VEHICLES}`}</td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
};

export default Table;
