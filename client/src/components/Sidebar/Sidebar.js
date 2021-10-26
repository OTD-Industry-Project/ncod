import React, { Component } from 'react'
import VehicleCard from './VehicleCard';
import MOCK_DATA from './MOCK_DATA.json';
import './Sidebar.css';

class Sidebar extends Component {
   
    vehicleCardClicked = param => e => {
        // Prevent page from reloading
        e.preventDefault();

        console.log(`Vehicle ${param}`);
    }

    render() {
        return (
            <div className="container-fluid table-responsive">
                
                <div className="d-flex justify-content-between p-1 align-items-center">
                    
                    <div className="form-group has-search w-75 mt-2 mb-2">
                        <span className="fa fa-search form-control-feedback"></span>
                        <input type="text" className="form-control" placeholder="Search"/>
                    </div>

                    <div class="dropdown">
                        <button class="btn border dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Sort
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                          <button class="dropdown-item" type="button">Action</button>
                          <button class="dropdown-item" type="button">Another action</button>
                          <button class="dropdown-item" type="button">Something else here</button>
                        </div>
                    </div>
                    
                </div>
                
                <table className="table">
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
                                        onClick={this.vehicleCardClicked(vehicle.id)}
                                    />
                        ))}
                    </tbody>
                </table>
            </div>
            
        )
    }
}

export default Sidebar;
