import React, { Component } from 'react'
import VehicleCard from './VehicleCard';
import MOCK_DATA from './MOCK_DATA.json';
import './Sidebar.css';
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';

class Sidebar extends Component {
    
    vehicleCardClicked = param => e => {
        // Prevent page from reloading
        e.preventDefault();

        // Todo

        // Log which row in the table was clicked
        console.log(`Vehicle ${param}`);
    }

    render() {
      
        return (
            // Container-fluid makes full width and table-responsive prevents table from overflowing at smaller screen sizes
            <div className="container-fluid table-responsive">
                
                {/* Search bar and Sort flex container. d-flex and Justify-content spread content horizontally, align-items centers them vertically */}
                <div className="d-flex justify-content-between p-1 align-items-center">
                    
                    {/* Bootstrap search bar */}
                    <div className="form-group has-search w-50 mt-2 mb-2">
                        <span className="fa fa-search form-control-feedback"></span>
                        <input type="text" className="form-control" placeholder="Search"/>
                    </div>

                    {/* react-dropdown-now package */}
                    <Dropdown
                      className="sort-dropdown"
                      placeholder="Select an option"
                      options={['Vehicle ID', 'On Time', 'Delayed', 'Pre Departed', 'Completed']}
                      value="Vehicle ID"
                      onChange={(value) => console.log('change!', value)}
                      onSelect={(value) => console.log('selected!', value)} 
                      onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
                      onOpen={() => console.log('open!')}
                    />
                    
                </div>
                
                {/* Table Starts here */}
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
                        {/* Map the data into the table, where the VehicleCard component returns a single table-row*/}
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
