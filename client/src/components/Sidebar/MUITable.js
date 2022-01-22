/*
 * Authors: James Hawes, Jamie Garner, Joseph Ising, Mark Dodson
 * -----
 * Created Date: Fri Dec 24 2021
 * -----
 * Last Modified: Sat Jan 22 2022
 */

import React from "react";
import MUIDataTable, { ExpandButton } from "mui-datatables";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import "./Sidebar.css";
import InfoCard from "./InfoCard";
import { getTime } from "./Table";

/** @module MUITable */

/**
 * Extends external MuiDatables package
 * @function MUITable
 * @param {props} props
 * @param {number} state.selectedRow Track state of table rows
 * @return {Component} Component containing interactive table with styling and additional features
 */
class MUITable extends React.Component {
    constructor(props) {
        super(props);
        
        // Set default state.
        this.state = {
            selectedRow: null,
        };
    }

    /**
     * Sets selected row into the class's state
     * @function handleEvent
     * @param {number} i Index of selected row
     */
    handleEvent = (i) => {
        
        // If row has already been selected, then unselect it. Then return
        if (i === this.state.selectedRow) {
            this.setState({selectedRow: null});
            return;
        }
        
        // If row has not been already selected, then set the state of the class
        this.setState({selectedRow: i});
    }
    
    render() {
        
        // Destructure props
        const { schedule, activeCallBack, colors, activeBus } = this.props;

        // Columns that MUIDataTable uses to render the table. Options are provided to set functionality of certain columns 
        const columns = [
            {
                name: "UID",
                options: {
                    filter: false,
                    display: false,
                },
            },
            {
                name: "Job ID",
                options: {
                    filter: false,
                    display: false,
                },
            },
            {
                name: "Status",
                options: {
                    filter: true,
                },
            },
            {
                name: "ID",
                options: {
                    filter: true,
                },
            },
            {
                name: "Destination",
                options: {
                    filter: false,
                    display: false,
                    
                },
            },
            {
                name: "Times",
                options: {
                    filter: false,
                }
            },
            {
                name: "ETA",
                options: {
                    filter: false,
                    showColumn: false,
                },
            },
        ];

        // Container for our data.
        const data = [];

        // Format the schedule in order to be rendered
        schedule.forEach((bus, index) => {
            bus.uid = index;
            data.push([
                bus.uid,
                bus.job_id,
                bus.status,
                bus.vehicle_id,
                bus.destination,
                new Date(bus.pickup_time).toLocaleTimeString([], {hour12: false}),
                new Date(bus.destination_time).toLocaleTimeString([], {hour12: false}),
            ]);
        });

        // Set our options for the table and extra functionality
        const options = {
            filter: true,
            filterType: "dropdown",
            responsive: "standard",
            download: true,
            expandableRows: true,
            elevation: 0,
            setRowProps: (row) => {
                return {
                    className: this.state.selectedRow && this.state.selectedRow === row[1] ? "selected" : "",
                };
            },
            rowsPerPage: 100,
            onRowClick: (rowData) => {
                this.handleEvent(rowData[1]);
                activeCallBack(rowData[1]);
            },
            selectableRowsHideCheckboxes: true,
            expandableRowsHeader: false,
            expandableRowsOnClick: true,
            setTableProps: () => {
                return {
                    padding: "none",
                    size: "default",
                };
            },
            isRowExpandable: (dataIndex, expandedRows) => {
                
                // Limit how many rows can be expanded at one time to 4
                if (
                    expandedRows.data.length > 4 &&
                    expandedRows.data.filter((d) => d.dataIndex === dataIndex)
                        .length === 0
                )
                    return false;
                return true;
            },
            rowsExpanded: [],
            renderExpandableRow: (rowData, rowMeta) => {
                const colSpan = rowData.length + 1;
                return (
                    // Return an info Card if a row is expanded
                    <TableRow className={this.state.selectedRow === rowMeta.rowIndex ? "selected" : ""}>
                        <TableCell  colSpan={colSpan} >
                            <InfoCard info={schedule[rowData[0]]} colors={colors} />
                        </TableCell>
                    </TableRow>
                );
            },
        };

        // Testing purposes
        const theme = createTheme({
            overrides: {
                MUIDataTable: {
                    root: {
                        backgroundColor: "blue",
                    },
                },
            },
        });

        // Expand arrow attached to each row
        const components = {
            ExpandButton: function (props) {
                return <ExpandButton {...props} />;
            },
        };

        return (
            <ThemeProvider theme={theme}>
                <MUIDataTable
                    className="mui-table"
                    title={"Schedule"}
                    data={data}
                    columns={columns}
                    options={options}
                    components={components}
                />
            </ThemeProvider>
        );
    }
}

export default MUITable;
