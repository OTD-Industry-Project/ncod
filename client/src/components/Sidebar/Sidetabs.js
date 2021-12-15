import React, { useState } from "react";
import { FiHome, FiChevronLeft, FiCompass, FiSettings } from "react-icons/fi";
import { Sidebar, Tab } from "./react-leaflet-sidetabs";
import DarkModeToggle from './DarkModeToggle';
import "./Sidebar.css";
import ColorPicker from "./ColorPicker";

const Sidetabs = (props) => {
    const [openTab, setOpenTab] = useState("/#schedule");
    

    const onClose = () => {
        setOpenTab(false);
    };

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
                <Tab id="/#schedule" header="Schedule" icon={<FiHome />}>
                    {props.children}
                </Tab>
                <Tab id="/#spare" header="Spare" icon={<FiCompass />}>
                    <h3>rehomeControls</h3>
                    <h4>boolean</h4>
                    <p>
                        Whether or not to automatically adjust control elements
                        to align with the sidetabs
                    </p>
                </Tab>
                <Tab
                    id="/#settings"
                    header="Settings"
                    icon={<FiSettings />}
                    anchor="bottom"
                >
                    <div className="container-fluid">
                        <div className="d-flex align-items-center mt-3">
                        <h5 className="m-3">Dark Mode:</h5>
                            <DarkModeToggle theme={props.theme} switchTheme={props.switchTheme} />
                        </div>
                        {/* PreDeparted Colour Picker */}
                        <div className="d-flex align-items-center mt-3">
                            <h3 className="m-3">Colours</h3>
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
