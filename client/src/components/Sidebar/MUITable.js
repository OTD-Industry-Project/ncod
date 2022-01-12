import React from "react";
import MUIDataTable, { ExpandButton } from "mui-datatables";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import "./Sidebar.css";
import InfoCard from "./InfoCard";
import { getTime } from "./Table";
class MUITable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRow: -1,
        };
    }

    handleEvent = (i) => {
        

        if (i === this.state.selectedRow) {
            this.setState({selectedRow: -1});
            console.log('row number ' + i + " deselected"); 
            return;
        }
        
    
        if (this.state.selectedRow !== undefined) {
            this.setState({selectedRow: i}); 
            console.log('row number ' + i + " selected"); 
        }
    }
    
    render() {
        const { schedule, activeCallBack, colors, activeBus } = this.props;

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

        const data = [];

        schedule.forEach((bus, index) => {
            bus.uid = index;
            data.push([
                bus.uid,
                bus.job_id,
                bus.status,
                bus.vehicle_id,
                bus.destination,
                getTime(bus.pickup_time),
                getTime(bus.destination_time),
            ]);
        });

        const options = {
            filter: true,
            filterType: "dropdown",
            responsive: "standard",
            download: false,
            //   fixedHeader: true,
            expandableRows: true,
            elevation: 0,
            setRowProps: (row) => {
                // console.log(this.state.selectedRow + " " + row[0]);
                return {
                    className: this.state.selectedRow === row[0] && activeBus !== null ? "selected" : "",
                };
            },
            rowsPerPage: 100,
            onRowClick: (rowData, rowMeta) => {
                this.handleEvent(rowMeta.rowIndex);
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
                    <TableRow className={this.state.selectedRow === rowMeta.rowIndex ? "selected" : ""}>
                        <TableCell  colSpan={colSpan} >
                            {/* {console.log(schedule[rowData[0]])} */}
                            <InfoCard info={schedule[rowData[0]]} colors={colors} />
                        </TableCell>
                    </TableRow>
                );
            },
            // onRowExpansionChange: (curExpanded, allExpanded, rowsExpanded) =>
            //     console.log(curExpanded, allExpanded, rowsExpanded),
        };

        const theme = createTheme({
            overrides: {
                MUIDataTable: {
                    root: {
                        backgroundColor: "blue",
                    },
                },
            },
        });

        const components = {
            ExpandButton: function (props) {
                // if (props.dataIndex === 3 || props.dataIndex === 4) return <div style={{width:'24px'}} />;
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
