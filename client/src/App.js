// import React, { useState, useEffect } from "react";
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MapWrapper from './components/MapWrapper/MapWrapper';
import { useState, useEffect } from 'react';

/* 
      This is the big picture view of the layout

                                COL
             --------------------------------------------
         ROW |                                          |
             |               Header                     |
             --------------------------------------------
             |            |                             |
             |            |                             |
             |     Side   |                             |
         ROW |     Bar    |     Map Section             |
             |            |                             |
             |            |                             |
             |            |                             |
             |            |                             |
             |            |                             |
             --------------------------------------------
                  COL                 COL
*/

function App() {

  // Commented out fetching to work on layout

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
    .then((res) => res.json())
    .then((data) => setData(data.message));
  }, []);

  return (
    
    // Entire app container
    <div className="container-fluid vh-100 d-flex flex-column">
      
      {/* Header row with one col */}
      <div className="row Header">
        <div className="col">
            <Header />
        </div>
      </div>

      {/* 2nd row. Two cols - Sidebar and Map Section */}
      <div className="row flex-grow-1">

        {/* Bootstrap Responsive resizing */}
        <div className="Sidebar col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <Sidebar />
            {!data ? "Server not responding..." : data}
        </div>

        {/* Bootstrap Responsive resizing */}
        <div className="Map col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
            <MapWrapper />
        </div>
      </div>
    </div>
  );
}

export default App;
