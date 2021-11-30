import React from "react";
import MUIDataTable, { ExpandButton } from "mui-datatables";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import "./Sidebar.css";

class MUITable extends React.Component {
    render() {
        const { schedule, activeCallBack } = this.props;

        const columns = [
            {
                name: "UID",
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
                },
            },
            {
                name: "Times",
                options: {
                    filter: false,
                },
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

        schedule.forEach((bus) => {
            data.push([
                bus.uid,
                bus.status,
                bus.VehicleID,
                bus.Destination,
                bus.PickupDateTime,
                bus.eta,
            ]);
        });

        const options = {
            filter: true,
            filterType: "dropdown",
            responsive: "standard",
            //   fixedHeader: true,
            expandableRows: true,
            rowsPerPage: 15,
            onRowClick: (rowData) => activeCallBack(rowData[0]),
            selectableRowsHideCheckboxes: true,
            expandableRowsHeader: false,
            expandableRowsOnClick: true,
            setTableProps: () => {
                return {
                    padding: "none",
                    size: "small",
                };
            },
            isRowExpandable: (dataIndex, expandedRows) => {
                // if (dataIndex === 3 || dataIndex === 4) return false;

                // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
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
                    <TableRow>
                        <TableCell colSpan={colSpan}>
                            {JSON.stringify(schedule[rowData[0]])}
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
