import React from 'react'
import './Sidebar.css';

const VehicleCard = ({status, id, destination, times, eta, onClick }) => {
    
    // Conditional css
    let classes = "";

    // add conditional classes to each table row
    switch (status) {
        case "Delayed":
            classes += "delayed"
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
    );
}

export default VehicleCard;
