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

    filterAndSort = (data, sortBy, orderBy) => {

        let filtered = data.filter(d => sortBy === "Vehicle ID" ? d != null : d.status === sortBy);

        // Prepend times with a leading Zero in order to sort
        filtered.forEach(el => {
            if (el.times.length < 5) {
                el.times = ["0", el.times].join("");
            }
        });

        if (orderBy === "Time ASC") {
            return filtered.sort((a, b) => (a.times < b.times) ? -1 : ((a.times > b.times) ? 1 : 0));
        } else if (orderBy === "Time DESC") {
            return filtered.sort((a, b) => (a.times < b.times) ? 1 : ((a.times > b.times) ? -1 : 0));
        } else {
            return filtered;
        }
 
    }

    constructor(props) {
        super(props);
        this.state = {
            data: MOCK_DATA,
            sortBy: "Vehicle ID",
            orderBy: "Default"
        }
      }

    render() {

        return (
            // Container-fluid makes full width and table-responsive prevents table from overflowing at smaller screen sizes
            <div className="container-fluid table-responsive">
                
                {/* Search bar and Sort flex container. d-flex and Justify-content spread content horizontally, align-items centers them vertically */}
                <div className="d-flex justify-content-between p-1 align-items-center">
                    
                    {/* Bootstrap search bar */}
                    <div className="form-group has-search mt-2 mb-2">
                        <span className="fa fa-search form-control-feedback"></span>
                        <input type="text" className="form-control" placeholder="Search"/>
                    </div>

                    {/* react-dropdown-now package */}
                    <p className="mt-3">Order By:</p>
                    <Dropdown
                      className="sort-dropdown"
                      placeholder="Order by"
                      options={['Default', 'Time ASC', 'Time DESC']}
                      value="Default"
                      onChange={(value) => console.log('change!', value)}
                      onSelect={(value) => {this.setState({orderBy: value.value})}} 
                      onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
                      onOpen={() => console.log('open!')}
                    />

                    <p className="mt-3">Sort By:</p>
                    <Dropdown
                      className="sort-dropdown"
                      placeholder="Select an option"
                      options={['Vehicle ID', 'On Time', 'Delayed', 'Pre Departed', 'Completed', ]}
                      value="Vehicle ID"
                      onChange={(value) => console.log('change!', value)}
                      onSelect={(value) => { this.setState({sortBy: value.value}); console.log(`changed to ${value.value}`)}} 
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

                            {
                                // Filter the data by the sortBy dropdown
                                this.filterAndSort(this.state.data, this.state.sortBy, this.state.orderBy).map(vehicle => (

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
