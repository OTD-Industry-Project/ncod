// Table Columns are defined here.
// The Header prop is what will be displayed on the page.
// The accessor corresponds to the JSON data file. This prop tells react-table what data to populate the column with.

export const COLUMNS = [
    {
        Header: 'Status',
        accessor: 'status'
    },
    {
        Header: 'ID',
        accessor: 'VehicleID',
    },
    {
        Header: 'Dest.',
        accessor: 'Destination',
    },
    {
        Header: 'From',
        accessor: 'PickupDateTime'
    },
    {
        Header: 'To',
        accessor: 'ArrivalDateTime'
    },
    {
        Header: 'ETA',
        accessor: 'eta'
    }
];