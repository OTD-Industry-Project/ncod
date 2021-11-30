// import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import MUITable from "./components/Sidebar/MUITable";
import Table from "./components/Sidebar/Table";
import Sidetabs from "./components/Sidebar/Sidetabs";
import Footer from "./components/Footer/Footer";
import MapWrapper from "./components/MapWrapper/MapWrapper.jsx";
import { useState, useEffect } from "react";
import { processedData } from "./data/DataHelper";
import SimpleSlide from "./components/Sidebar/SimpleSlide";

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
    const [schedule, setSchedule] = useState(processedData());
    const [activeBus, setActiveBus] = useState(null);
    
    const [tableType, setTableType] = useState(true);


    const changeTableType = () => {
        setTableType((prev) => !prev);
    };

    const activeCallBack = (uid) => {
        const index = schedule.findIndex((obj) => obj.uid === uid);
        let newSchedule = schedule;

        if (activeBus !== null && activeBus.uid === uid) {
            setActiveBus(null);
            console.log("Row is unselected and Active bus is set back to null");
        } else {
            setActiveBus(newSchedule[index]);
        }
        // setSchedule(newSchedule);
    };

<<<<<<< HEAD
    const handleChange = () => {
        setScheduleOpen((prev) => !prev);
        if (schedule) {
            setActiveBus(null);
        }
    };
=======
    // const handleChange = () => {
    //     setScheduleOpen((prev) => !prev);
    //     if (schedule) {
    //         setActiveBus(null);
    //     }
    //   };
>>>>>>> cc77fb4ea68b2fd63d69c7b17166494b4bfad651

    useEffect(() => {
        fetch("/api/address")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    

    return (
        // Entire app container
        <div className="container-fluid vh-100 d-flex flex-column">
            {/* Header row with one col */}
            <div className="row Header">
                <div className="col">
<<<<<<< HEAD
                    <Header handleChange={handleChange} />
=======
                    <Header changeTableType={changeTableType} />
>>>>>>> cc77fb4ea68b2fd63d69c7b17166494b4bfad651
                </div>
            </div>
            {/* Footer row with one col */}

            {/* 2nd row. Two cols - Sidebar and Map Section */}
            <div className="Map">
<<<<<<< HEAD
                <div className={scheduleOpen ? "Sidebar" : "Sidebar closed"}>
                    <SimpleSlide scheduleOpen={scheduleOpen}>
                        <Sidebar
=======
                {console.log(data)}
                
                <div className="Sidebar">
                    
                    <Sidetabs>
                      {tableType ? <Table
>>>>>>> cc77fb4ea68b2fd63d69c7b17166494b4bfad651
                            schedule={schedule}
                            activeCallBack={activeCallBack}
                        /> :
                      <MUITable schedule={schedule} activeCallBack={activeCallBack}/>
                      
                      }
                    </Sidetabs>
                    
                </div>

                <MapWrapper schedule={schedule} activeBus={activeBus} />
                
                
                <div className="Footer">
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default App;
