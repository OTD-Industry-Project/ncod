import React, { Component } from 'react'
import VehicleCard from './VehicleCard';
import MOCK_DATA from './MOCK_DATA.json';

class Sidebar extends Component {
   
    vehicleCardClicked = param => e => {
        // Prevent page from reloading
        e.preventDefault();

        console.log(`Vehicle ${param}`);
    }

    render() {
        return (
            <div className="container-fluid table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Status</th>
                            <th scope="col">ID</th>
                            <th scope="col">Destination</th>
                            <th scope="col">Times</th>
                            <th scope="col">ETA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_DATA.map(vehicle => (
                             
                                <VehicleCard 
                                    key={vehicle.id}
                                    status={vehicle.status}
                                    id={vehicle.id}
                                    destination={vehicle.destination}
                                    times={vehicle.times}
                                    eta={vehicle.eta}
                                    onClick={this.vehicleCardClicked.bind(this)}
                                />
                        ))}
                    </tbody>
                </table>
            </div>
            
        )
    }
}

export default Sidebar;
