// import React, { useState, useEffect } from "react";
import './App.css';
import Header from './components/Header/Header';

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

  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch("/api")
  //   .then((res) => res.json())
  //   .then((data) => setData(data.message));
  // }, []);

  return (
    
    // Entire app container
    <div className="container-fluid min-vh-100 d-flex flex-column">
      
      {/* Header row with one col */}
      <div className="row">
        <div className="col border bg-primary">
            <Header />
        </div>
      </div>

      {/* 2nd row. Two cols - Sidebar and Map Section */}
      <div className="row flex-grow-1">

        {/* Bootstrap Responsive resizing */}
        <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-3 border bg-secondary">
            Sidebar
        </div>

        {/* Bootstrap Responsive resizing */}
        <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-9 border bg-danger">
            Map
        </div>
      </div>
    </div>
  );
}

export default App;
