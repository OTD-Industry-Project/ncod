import React from "react";
import "./Sidebar.css";

const InfoCard = ({ info, colors }) => {
    const {
        PickupDateTime,
        PickupPoint,
        PickupInstructions,
        PickupPointLatitude,
        PickupPointLongitude,
        Destination,
        DestinationLatitude,
        DestinationLongitude,
        DestinationInstructions,
        ArrivalDateTime,
        SingleJourney,
        VehicleToStay,
        VehicleID,
        FleetNo,
        DriverID,
        DurationMinutes,
        uid,
        eta,
        status,
    } = info;

    let color;
    console.log(colors);

    switch (status) {
        case 'On Time':
            color = colors.ontime;
            break;
        case 'Pre Departed':
            color = colors.predeparted;
            break;
        case 'Delayed':
            color = colors.delayed;
            break;
        case 'Completed':
            color = colors.completed;
            break;
        default:
            color = '#f00';
    }

    return (
        <div className="container-fluid info-card" >
            <div className="d-flex justify-content-between">
                <h6>
                    Driver: <strong>{DriverID}</strong>
                </h6>
                <h6>
                    ETA: <strong className="eta" style={{backgroundColor: color, padding: '0.2rem', borderRadius: '10px'}}>{eta}</strong>
                </h6>
            </div>
            <div className="d-flex justify-content-between">
                <h6>
                    Stay: <strong>{VehicleToStay === 1 ? "Yes" : "No"}</strong>
                </h6>
                <h6>
                    Duration: <strong>{DurationMinutes}mins</strong>
                </h6>
            </div>

            <table className="table mt-3">
                <thead>
                    <th scope="col"></th>
                    <th scope="col">Pickup</th>
                    <th scope="col">Destination</th>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Name</th>
                        <td>{PickupPoint}</td>
                        <td>{Destination}</td>
                    </tr>
                    <tr>
                        <th scope="row">Times</th>
                        <td>{PickupDateTime}</td>
                        <td>{ArrivalDateTime}</td>
                    </tr>
                    <tr>
                        <th scope="row">Info</th>
                        <td>{PickupInstructions}</td>
                        <td>{DestinationInstructions}</td>
                    </tr>
                    <tr>
                        <th scope="row">Lat</th>
                        <td>{PickupPointLatitude}</td>
                        <td>{DestinationLatitude}</td>
                    </tr>
                    <tr>
                        <th scope="row">Long</th>
                        <td>{PickupPointLongitude}</td>
                        <td>{DestinationLongitude}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default InfoCard;
