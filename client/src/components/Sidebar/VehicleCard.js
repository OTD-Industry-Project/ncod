import React from 'react'
import './Sidebar.css';

const VehicleCard = ({status, id, destination, times, eta, onClick }) => {
    
    let classes = "";

    switch (status) {
        case "Delayed":
            classes += "table-danger hovers"
            break;
        default:
            classes += "";
    }

    classes += " table-row"
    
    return (
        <React.Fragment>
            <tr className={classes} onClick={onClick}>
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
