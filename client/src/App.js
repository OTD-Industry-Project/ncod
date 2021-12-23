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
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from "./components/Theme/Themes";

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
    const [theme, setTheme] = useState(false);
    const [colors, setColors] = useState({
        predeparted: "#1e90ff",
        ontime: "#228b22",
        delayed: "#ff4500",
        completed: "#a9a9a9",
    });
    const [date, setDate] = useState(new Date());

    const changeTableType = () => {
        setTableType((prev) => !prev);
    };

    const changeDate = (newDate) => {
        setDate(newDate);
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

    const switchTheme = () => {
        localStorage.setItem("theme", theme ? "light" : "dark");
        setTheme((prev) => !prev);
    };

    const changeColors = (key, color) => {
        let existingColorScheme = JSON.parse(
            localStorage.getItem("color-scheme")
        );

        if (existingColorScheme) {
            existingColorScheme[key] = color;
            localStorage.setItem(
                "color-scheme",
                JSON.stringify(existingColorScheme)
            );
        }

        setColors((prevColors) => ({
            ...prevColors,
            [key]: color,
        }));
    };

    // const handleChange = () => {
    //     setScheduleOpen((prev) => !prev);
    //     if (schedule) {
    //         setActiveBus(null);
    //     }
    //   };

    useEffect(() => {
        const existingTheme = localStorage.getItem("theme");

        if (existingTheme) {
            existingTheme === "light" ? setTheme(false) : setTheme(true);
        } else {
            setTheme(false);
            localStorage.setItem("theme", "light");
        }

        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    useEffect(() => {
        const existingColorScheme = localStorage.getItem("color-scheme");

        if (existingColorScheme) {
            const existingColors = JSON.parse(
                localStorage.getItem("color-scheme")
            );
            setColors({
                predeparted: existingColors.predeparted,
                ontime: existingColors.ontime,
                delayed: existingColors.delayed,
                completed: existingColors.completed,
            });
        } else {
            setColors(
                {
                    predeparted: "#1e90ff",
                    ontime: "#228b22",
                    delayed: "#ff4500",
                    completed: "#a9a9a9",
                },
                localStorage.setItem("color-scheme", JSON.stringify(colors))
            );
        }
    }, []);

    return (
        <ThemeProvider theme={theme ? darkTheme : lightTheme}>
            <>
                <GlobalStyle />
                {/* Entire app container */}
                <div className="container-fluid vh-100 d-flex flex-column">
                    {/* Header row with one col */}
                    <div className="row Header">
                        <div className="col">
                            <Header
                                changeDate={changeDate}
                                date={date}
                                changeTableType={changeTableType}
                                theme={theme}
                                switchTheme={switchTheme}
                            />
                        </div>
                    </div>
                    {/* Footer row with one col */}

                    {/* 2nd row. Two cols - Sidebar and Map Section */}
                    <div className="Map">
                        <div className="Sidebar">
                            <Sidetabs
                                switchTheme={switchTheme}
                                colors={colors}
                                changeColors={changeColors}
                            >
                                <Table
                                    schedule={schedule}
                                    activeCallBack={activeCallBack}
                                />

                                <MUITable
                                    schedule={schedule}
                                    activeCallBack={activeCallBack}
                                    colors={colors}
                                />
                            </Sidetabs>
                        </div>

                        <MapWrapper
                            schedule={schedule}
                            activeBus={activeBus}
                            colors={colors}
                        />

                        <div className="Footer">
                            <Footer />
                        </div>
                    </div>
                </div>
            </>
        </ThemeProvider>
    );
}

export default App;
