// import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { isSameDay } from "./components/Header/Datetime";
import MUITable from "./components/Sidebar/MUITable";
import Table from "./components/Sidebar/Table";
import Sidetabs from "./components/Sidebar/Sidetabs";
import Footer from "./components/Footer/Footer";
import MapWrapper from "./components/MapWrapper/MapWrapper.jsx";
import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from "./components/Theme/Themes";
import Loading from "./components/Loading";
import { calculatedSchedule } from "./helpers/ScheduleHelper";
import * as ROUTES from './constants/routes';
import L from 'leaflet';
import "leaflet-routing-machine";
import '../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css';

function App() {

    /***** Hooks *****/

    // App State
    const [availableHistoryDates, setAvaliableHistoryDates] = useState([]);
    const [data, setData] = useState(null);
    const [date, setDate] = useState(new Date());
    const [play, setPlay] = useState(false);
    const [historyMode, setHistoryMode] = useState(false);
    const [schedule, setSchedule] = useState(null);
    const [activeBus, setActiveBus] = useState(null);
    const [theme, setTheme] = useState(false);
    const [routesArray, setRoutesArray] = useState(null);
    const [colors, setColors] = useState({
        predeparted: "#1e90ff",
        ontime: "#228b22",
        delayed: "#ff4500",
        completed: "#a9a9a9",
    });

    /***** Callbacks *****/

    // Set Play state
    const handleCallback = (m) => {
        setPlay(m);
    };

    // Update Date state
    const changeDate = (newDate) => {
        setHistoryMode(!isSameDay(newDate, new Date()));
        setDate(newDate);
        fetchHistory(newDate);
    };

    // Update active bus state
    const activeCallBack = (job_id) => {

        const index = schedule.findIndex((obj) => obj.job_id === job_id);


        if (activeBus !== null && activeBus.job_id === job_id) {
            setActiveBus(null);
            console.log("Row is unselected and Active bus is set back to null");
        } else {
            setActiveBus(schedule[index]);
        }

    };

    // Switch theme and set local storage
    const switchTheme = () => {
        localStorage.setItem("theme", theme ? "light" : "dark");
        setTheme((prev) => !prev);
    };

    // Change color scheme and set local storage
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


    /***** On App load *****/

    // Get/Set theme and color scheme from local storage
    useEffect(() => {

        const existingTheme = localStorage.getItem("theme");

        if (existingTheme) {
            existingTheme === "light" ? setTheme(false) : setTheme(true);
        } else {
            setTheme(false);
            localStorage.setItem("theme", "light");
        }

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchHistory = (date) => {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({date: date})
        };

        fetch(ROUTES.getHistory(), options)
            .then((res) => res.json())
            .then((data) =>  setSchedule(calculatedSchedule(data.data.schedule, date )));
            

    } 

    // Fetch schedule
    useEffect(() => {
        //GENERATE ROUTES ON LOAD
        var controlarray = []
        schedule.map((value, index) => (
            controlarray.push(
                {
                    route: L.Routing.control({
                        serviceUrl: '//localhost:5000/route/v1',
                        waypoints: [
                            L.latLng(value.PickupPointLatitude, value.PickupPointLongitude),
                            L.latLng(value.DestinationLatitude, value.DestinationLongitude)
                        ],
                        lineOptions: {
                            styles: [{ color: 'rgb(0, 220, 240)', weight: 6 }]
                        },
                        show: false,
                        showAlternatives: false,
                        createMarker: function () { return null },
                        fitSelectedRoutes: false,
                        addWaypoints: false,
                        draggableWaypoints: false,
                    }),
                    onScreen: false
                }
            )
        ))
        console.log('c-array',controlarray)
        setRoutesArray(controlarray)

        fetch(ROUTES.getSchedule())
            .then((res) => res.json())
            .then((data) => {
                setSchedule(calculatedSchedule(data.data.schedule, new Date()))
                let dates = [];
                data.data.availableHistory.forEach(({date}) => dates.push(new Date(date)));
                setAvaliableHistoryDates(dates);
            });

        
    }, []);



    return (
        <ThemeProvider theme={theme ? darkTheme : lightTheme}>
            <>
            {data && console.log(data)}
                <GlobalStyle />
                {/* Entire app container */}
                <div className="container-fluid vh-100 d-flex flex-column">
                    {/* Header row with one col */}
                    <div className="row Header">
                        <div className="col">

                            <Header
                                changeDate={changeDate}
                                date={date}
                                theme={theme}
                                switchTheme={switchTheme}
                                availableHistoryDates={availableHistoryDates}
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
                                {schedule !== null ? (
                                    <Table
                                        schedule={schedule}
                                        activeCallBack={activeCallBack}
                                        activeBus={activeBus}
                                    />
                                ) : (
                                    <Loading />
                                )}

                                {schedule !== null ? (
                                    <MUITable
                                        schedule={schedule}
                                        activeCallBack={activeCallBack}
                                        colors={colors}
                                        activeBus={activeBus}
                                    />
                                ) : (
                                    <Loading />
                                )}
                            </Sidetabs>
                        </div>


                        <MapWrapper
                            schedule={schedule}
                            activeBus={activeBus}
                            colors={colors}
                            routesArray={routesArray}
                        />


                        <div className="Footer">
                            <Footer
                                handleCallback={handleCallback}
                                play={play}
                                historyMode={historyMode}
                            />
                        </div>
                    </div>
                </div>
            </>

        </ThemeProvider>
    );
}

export default App;
