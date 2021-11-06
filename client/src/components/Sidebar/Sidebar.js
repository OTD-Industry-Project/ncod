import React, { useMemo, useState } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import "./Sidebar.css";
import TEST_DATA from "../../data/TEST_DATA.json";
import { COLUMNS } from "./Columns";
import { Filter } from "./Filter";

const NUM_OF_VEHICLES = 50;

export const Sidebar = () => {
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const newData = TEST_DATA;

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    // Iterate through each entry
    // Add a random status to each bus
    // Clean up time formatting
    newData.forEach((el) => {
        el.PickupDateTime = el.PickupDateTime.substr(
            el.PickupDateTime.indexOf(" ") + 1
        );
        el.ArrivalDateTime = el.ArrivalDateTime.substr(
            el.ArrivalDateTime.indexOf(" ") + 1
        );

        el.eta = el.ArrivalDateTime;

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

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => newData.slice(0, NUM_OF_VEHICLES), []);

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = tableInstance;

    const { globalFilter } = state;

    return (
        <>
            <div className="Top container-fluid d-flex justify-content-between">
                <Filter className="Search" filter={globalFilter} setFilter={setGlobalFilter} />
                <div className="text-secondary align-self-center">{`Last Updated: ${lastUpdated.toLocaleTimeString()}`}</div>
            </div>

            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.render("Header")}
                                    <span>
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
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
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
                <tfoot>
                    <td
                        className="text-center h6 p-1"
                        colSpan="6"
                    >{`Total Vehicles: ${NUM_OF_VEHICLES}`}</td>
                </tfoot>
            </table>
        </>
    );
};

export default Sidebar;
