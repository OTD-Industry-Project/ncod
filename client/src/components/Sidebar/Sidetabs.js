import React, { useState } from "react";
import { FiHome, FiChevronLeft, FiSettings, FiList } from "react-icons/fi";
import { Sidebar, Tab } from "./react-leaflet-sidetabs";

import "./Sidebar.css";
import ColorPicker from "./ColorPicker";

/** @module Sidetabs */

/**
 * Extends the react-leaflet-sidetabs package
 * @function Sidetabs
 * @param {props} props Various components and variables
 * @returns {Component} Floating sidebar
 */
const Sidetabs = (props) => {
    
    /**
     * Track state of which tab is open
     * @function setOpenTab
     * @param {string} openTab String that represents an internal route to each tab  
     */
    const [openTab, setOpenTab] = useState("/#schedule");
    

    /**
     * Event listener that updates state of tabs
     * @function onClose
     */
    const onClose = () => {
        setOpenTab(false);
    };

    /**
     * Event listener that updates state of tabs
     * @function onOpen
     */
    const onOpen = (id) => {
        setOpenTab(id);
    };

    return (
        <section>
            <Sidebar
                position="left"
                collapsed={!openTab}
                selected={openTab}
                closeIcon={<FiChevronLeft />}
                onClose={onClose}
                onOpen={onOpen}
            >
                <Tab id="/#schedule" header="Overview" icon={<FiHome />}>
                    {props.children[1]}
                </Tab>
                <Tab id="/#spare" header="Schedule" icon={<FiList />}>
                    {props.children[0]}
                </Tab>
                <Tab
                    id="/#settings"
                    header="Settings"
                    icon={<FiSettings />}
                    anchor="bottom"
                >
                    <div className="container-fluid">
                        
                        {/* PreDeparted Colour Picker */}
                        <div className="d-flex align-items-center mt-3">
                            <h3 className="m-3">Bus Icon Colours</h3>
                        </div>

                        <div className="d-flex flex-column mt-3">
                            <h5 className="m-3">Pre Departed:</h5>
                            <ColorPicker
                                
                                k={"predeparted"}
                                color={props.colors.predeparted}
                                changeColors={props.changeColors}
                            /> 
                            
                        </div>

                        {/* Ontime Colour Picker */}

                        <div className="d-flex flex-column mt-3">
                            <h5 className="m-3">On Time:</h5>
                            <ColorPicker
                                k={"ontime"}
                                color={props.colors.ontime}
                                
                                changeColors={props.changeColors}
                            />
                            
                        </div>


                        {/* Delayed Colour Picker */}

                        <div className="d-flex flex-column mt-3">
                            <h5 className="m-3">Delayed:</h5>
                            <ColorPicker
                                k={"delayed"}
                                color={props.colors.delayed}
                                
                                changeColors={props.changeColors}
                            />
                            
                        </div>

                        {/* Completed Colour Picker */}
                        <div className="d-flex flex-column mt-3">
                            <h5 className="m-3">Completed:</h5>
                            <ColorPicker
                                k={"completed"}
                                color={props.colors.completed}
                                
                                changeColors={props.changeColors}
                            />
                            
                        </div>

                    </div>
                </Tab>
            </Sidebar>
        </section>
    );
};

export default Sidetabs;
