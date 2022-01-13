
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
import { timestampFormat } from "concurrently/src/defaults";
import L from 'leaflet';
import "leaflet-routing-machine";
import '../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useMap } from 'leaflet';

/**@module App */


/**
 * @function CreateRoutes
 * @author Joseph Ising
 * @param {Object} data Scheduled data that is fetched from database
 * @param {callback} setRoutesArray Call back function to update state of App
 */
function CreateRoutes(data, setRoutesArray){
    //GENERATE ROUTES ON LOAD
    var controlsArray=[];
    console.log('data:',data)
    if (data != null) {
        data.data.schedule.map((value, index) => (
            controlsArray.push(
                [{
                    route: L.Routing.control({
                        // serviceUrl: '//localhost:5000/route/v1',
                        waypoints: [
                            L.latLng(value.pickup_latitude, value.pickup_longitude),
                            L.latLng(value.destination_latitude, value.destination_longitude),
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
                },value.vehicle_id]
            )
        ))
        console.log('c-array', controlsArray);
        setRoutesArray(controlsArray);
    }
}


/**
 * Entry point for entire application - Is injected into the 'body' DOM element with a class of 'root'. 
 * @function App
 * 
 * @author Mark Dodson 
 * @author James Hawes 
 * @author Jamie Garner
 * @author Joseph Ising
 * 
 * @returns The entire app as JSX
 */
function App() {

    /** Global state hooks */
    const [waypoints, setWaypoints] = useState([]);
    const [availableHistoryDates, setAvaliableHistoryDates] = useState([]);
    const [data, setData] = useState(null);
    const [date, setDate] = useState(new Date());
    const [play, setPlay] = useState(false);
    const [historyMode, setHistoryMode] = useState(false);
    const [schedule, setSchedule] = useState(null);
    const [activeBus, setActiveBus] = useState(null);
    const [theme, setTheme] = useState(false);
    const [routesArray, setRoutesArray] = useState(null);
    const [oldRoutesArray, setOldRoutesArray] = useState(null);
    const [colors, setColors] = useState({
        predeparted: "#1e90ff",
        ontime: "#228b22",
        delayed: "#ff4500",
        completed: "#a9a9a9",
    });

    /** Callbacks */

    /**
     * Callback to switch between play states
     * @function playCallback
     * 
     * @param {boolean} e switches between play and pause 
     */
    const playCallback = (e) => {
        setPlay(e);
    };

    /**
     * Callback function to set and update global date of app 
     * @function changeDate 
     * @param {date} newDate Use this date to update the global date tracked in the app
     */
    const changeDate = (newDate) => {
        setHistoryMode(!isSameDay(newDate, new Date()));
        setDate(newDate);
        fetchHistory(newDate);
        setActiveBus(null);
    };

    /**
     * Callback function to update which bus is being tracked as active 
     * @function activeCallBack
     * @param {number} job_id Unique number to identify each job 
     */
    const activeCallBack = (job_id) => {

        const index = schedule.findIndex((obj) => obj.job_id === job_id);


        if (activeBus !== null && activeBus.job_id === job_id) {
            setActiveBus(null);
            console.log("Row is unselected and Active bus is set back to null");
        } else {
            setActiveBus(schedule[index]);
        }

    };

    /**
     * Switches between true and false and sets the new theme to local storage
     * @function switchTheme
     * 
     */
    const switchTheme = () => {
        localStorage.setItem("theme", theme ? "light" : "dark");
        setTheme((prev) => !prev);
    };

    /**
     * Callback function to update colorscheme of app. New color scheme is set to local storage
     * @function changeColors
     * @param {number} key number between 0 and existingColorScheme.length to update correct color
     * @param {string} color Hex code of new color to be set 
     */
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


    /**
     * function 
     */
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
            body: JSON.stringify({ date: date })
        };
        
        fetch(ROUTES.getHistory(), options)
            .then((res) => res.json())
            .then((data) => {
                setSchedule(calculatedSchedule(data.data.schedule, date ));
                
                const uniqueBuses = [...new Set(data.data.waypoints.map(bus => bus.vehicle_id))];

                let historyWaypoints = [];

                uniqueBuses.forEach(uniqueBus => {
                    
                    const tmp = data.data.waypoints.filter(({vehicle_id}) => vehicle_id === uniqueBus);
                    let temp = [];
                    tmp.forEach(bus => temp.push([bus.latitude, bus.longitude]));
                    
                    historyWaypoints.push({     
                        [uniqueBus]: temp,
                    });
                })
                
                setWaypoints(historyWaypoints);
                console.log('ra',routesArray);
                if(routesArray!=null){
                    console.log('setting routes');
                    setOldRoutesArray(routesArray);
                }
                setSchedule(calculatedSchedule(data.data.schedule, date));
                console.log('ROUTES:',data);
                CreateRoutes(data, setRoutesArray);

            });
            

    } 

    // Fetch schedule
    useEffect(() => {



        fetch(ROUTES.getSchedule())
            .then((res) => res.json())
            .then((data) => {
                setSchedule(calculatedSchedule(data.data.schedule, new Date()));
                let dates = [];
                data.data.availableHistory.forEach(({ date }) => dates.push(new Date(date)));
                setAvaliableHistoryDates(dates);
                CreateRoutes(data, setRoutesArray);
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
                            waypoints={waypoints}
                            routesArray={routesArray}
                            oldRoutesArray={oldRoutesArray}
                        />


                        <div className="Footer">
                            <Footer
                                handleCallback={playCallback}
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
