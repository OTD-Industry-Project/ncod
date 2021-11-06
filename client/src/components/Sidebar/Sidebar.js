import React, { useMemo, useState } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import "./Sidebar.css";
import TEST_DATA from "../../data/TEST_DATA.json";
import { COLUMNS } from "./Columns";
import { Filter } from "./Filter";

const NUM_OF_VEHICLES = 50;

export const Sidebar = () => {
    
    // Keep track of last updated. Will be more useful when we are pulling live GPS data
    const [lastUpdated, setLastUpdated] = useState(new Date());
    
    // Make a copy of the TEST_DATA file
    const newData = TEST_DATA;

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    // Iterate through each object in newData
    // Add a randomised status property to each object
    // Add an ETA property to each object
    // Remove date from times
    newData.forEach((el) => {
        
        // Remove dates from PickupDateTime and ArrivalDataTime
        el.PickupDateTime = el.PickupDateTime.substr(
            el.PickupDateTime.indexOf(" ") + 1
        );
        
        el.ArrivalDateTime = el.ArrivalDateTime.substr(
            el.ArrivalDateTime.indexOf(" ") + 1
        );

        // Set the eta as arrival date time
        el.eta = el.ArrivalDateTime;

        // Randomly pick a status
        switch (getRandomInt(4)) {
            case 0:
                el.status = "On Time";
                break;
            case 1:
                el.status = "Pre Departed";
                break;
            case 2:
                el.status = "Delayed";
                break;
            case 3:
                el.status = "Completed";
                break;
            default:
                el.status = "Error";
        }
    });

    // Memoize the columns and data for the table. 
    // This is essentially caching all the data, so react doesn't need to rebuild the data and columns on every refresh.
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => newData.slice(0, NUM_OF_VEHICLES), []);

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
            <div className="Top container-fluid d-flex justify-content-between">
                <Filter className="Search" filter={globalFilter} setFilter={setGlobalFilter} />
                <div className="text-secondary align-self-center">{`Last Updated: ${lastUpdated.toLocaleTimeString()}`}</div>
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
                    {rows.map((row) => {

                        // React-table function that prepares the row to be iterated over and displayed
                        prepareRow(row);
                        
                        return (
                            
                            // Get and apply row props
                            <tr {...row.getRowProps()}>

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

export default Sidebar;
