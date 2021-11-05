export const COLUMNS = [
    {
        Header: 'Status',
        accessor: 'status'
    },
    {
        Header: 'ID',
        accessor: 'vehicle_id',
    },
    {
        Header: 'Dest.',
        accessor: 'dest',
    },
    {
        Header: 'Times',
        columns: [
            {
                Header: 'Pickup',
                accessor: 'pickup_time'
            },
            {
                Header: 'Dest.',
                accessor: 'dest_time'
            }
        ]
    },
    {
        Header: 'ETA',
        accessor: 'eta'
    }
];