import React from 'react'

const VehicleCard = ({status, id, destination, times, eta, onClick }) => {
    
    let colorClass;

    switch (status) {
        case "Completed":
            colorClass = "table-success"
            break;
        case "On Time":
            colorClass = "table-primary"
            break;
        case "Delayed":
            colorClass = "table-danger"
            break;
        default:
            colorClass = "";
    }

    
    return (
        <React.Fragment>
            <tr className={colorClass}>
                <th>{status}</th>
                <td>{id}</td>
                <td>{destination}</td>
                <td>{times}</td>
                <td>{eta}</td>
            </tr>
        </React.Fragment>
    )
}

export default VehicleCard;
