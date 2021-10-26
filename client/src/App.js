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
    <div className="container-fluid vh-100 d-flex flex-column">
      
      {/* Header row with one col */}
      <div className="row Header">
        <div className="col bg-primary">
            <Header />
        </div>
      </div>

      {/* 2nd row. Two cols - Sidebar and Map Section */}
      <div className="row flex-grow-1">

        {/* Bootstrap Responsive resizing */}
        <div className="Sidebar col-12 col-sm-12 col-md-12 col-lg-4 col-xl-3">
        <h1>Scrollabe Sidebar</h1>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum augue nec nisl tempus vestibulum. Phasellus eget neque id lectus malesuada maximus. Ut quis tellus massa. Sed mattis bibendum sem, quis dapibus quam commodo sit amet. Sed volutpat lacinia lacus non finibus. Praesent vitae nunc sed turpis suscipit porttitor vehicula nec elit. Sed eleifend velit dui, vel pulvinar arcu egestas at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec nisi odio, malesuada vel vulputate ac, ornare et dolor. Aenean quis purus urna. Nullam enim nibh, eleifend at auctor nec, luctus sit amet nulla. Praesent vel justo nec augue congue venenatis. Nam tincidunt ultrices arcu et auctor. Donec ut sapien eu mauris pretium sagittis. Proin fermentum ex augue, et fringilla risus ultricies aliquet. Duis semper ullamcorper augue vel tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum augue nec nisl tempus vestibulum. Phasellus eget neque id lectus malesuada maximus. Ut quis tellus massa. Sed mattis bibendum sem, quis dapibus quam commodo sit amet. Sed volutpat lacinia lacus non finibus. Praesent vitae nunc sed turpis suscipit porttitor vehicula nec elit. Sed eleifend velit dui, vel pulvinar arcu egestas at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec nisi odio, malesuada vel vulputate ac, ornare et dolor. Aenean quis purus urna. Nullam enim nibh, eleifend at auctor nec, luctus sit amet nulla. Praesent vel justo nec augue congue venenatis. Nam tincidunt ultrices arcu et auctor. Donec ut sapien eu mauris pretium sagittis. Proin fermentum ex augue, et fringilla risus ultricies aliquet. Duis semper ullamcorper augue vel tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum augue nec nisl tempus vestibulum. Phasellus eget neque id lectus malesuada maximus. Ut quis tellus massa. Sed mattis bibendum sem, quis dapibus quam commodo sit amet. Sed volutpat lacinia lacus non finibus. Praesent vitae nunc sed turpis suscipit porttitor vehicula nec elit. Sed eleifend velit dui, vel pulvinar arcu egestas at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec nisi odio, malesuada vel vulputate ac, ornare et dolor. Aenean quis purus urna. Nullam enim nibh, eleifend at auctor nec, luctus sit amet nulla. Praesent vel justo nec augue congue venenatis. Nam tincidunt ultrices arcu et auctor. Donec ut sapien eu mauris pretium sagittis. Proin fermentum ex augue, et fringilla risus ultricies aliquet. Duis semper ullamcorper augue vel tempus.
        </div>

        {/* Bootstrap Responsive resizing */}
        <div className="Map col-12 col-sm-12 col-md-12 col-lg-8 col-xl-9">
            Map
        </div>
      </div>
    </div>
  );
}

export default App;
