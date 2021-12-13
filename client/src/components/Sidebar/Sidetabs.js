import React, { useState } from "react";
import { FiHome, FiChevronLeft, FiCompass, FiSettings } from "react-icons/fi";
import { Sidebar, Tab } from "./react-leaflet-sidetabs";
import "./Sidebar.css";
import ColorPicker from "./ColorPicker";

const Sidetabs = (props) => {
    const [openTab, setOpenTab] = useState("/#schedule");
    const [showColorPicker, setShowColorPicker] = useState({
        predeparted: false,
        ontime: false,
        delayed: false,
        completed: false,
    });

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
                        {/* PreDeparted Colour Picker */}
                        <div className="d-flex align-items-center mt-3">
                            <h3 className="m-3">Colours</h3>
                        </div>

                        <div className="d-flex mt-3 align-items-center">
                            <h5 className="m-3">Pre Departed:</h5>
                            <ColorPicker
                                k={"predeparted"}
                                color={props.colors.predeparted}
                                showColorPicker={showColorPicker.predeparted}
                                changeColors={props.changeColors}
                            />
                            <button
                                className="btn btn-secondary"
                                style={{
                                    backgroundColor: props.colors.predeparted,
                                }}
                                onClick={() =>
                                    setShowColorPicker((prev) => ({
                                        predeparted: !prev.predeparted,
                                    }))
                                }
                            >
                                {showColorPicker.predeparted ? "Set" : "Change"}
                            </button>
                        </div>



                        {/* Ontime Colour Picker */}

                        <div className="d-flex mt-3 align-items-center">
                            <h5 className="m-3">On Time:</h5>
                            <ColorPicker
                                k={"ontime"}
                                color={props.colors.ontime}
                                showColorPicker={showColorPicker.ontime}
                                changeColors={props.changeColors}
                            />
                            <button
                                className="btn btn-secondary"
                                style={{
                                    backgroundColor: props.colors.ontime,
                                }}
                                onClick={() =>
                                    setShowColorPicker((prev) => ({
                                        ontime: !prev.ontime,
                                    }))
                                }
                            >
                                {showColorPicker.ontime ? "Set" : "Change"}
                            </button>
                        </div>


                        {/* Delayed Colour Picker */}

                        <div className="d-flex mt-3 align-items-center">
                            <h5 className="m-3">Delayed:</h5>
                            <ColorPicker
                                k={"delayed"}
                                color={props.colors.delayed}
                                showColorPicker={showColorPicker.delayed}
                                changeColors={props.changeColors}
                            />
                            <button
                                className="btn btn-secondary"
                                style={{
                                    backgroundColor: props.colors.delayed,
                                }}
                                onClick={() =>
                                    setShowColorPicker((prev) => ({
                                        delayed: !prev.delayed,
                                    }))
                                }
                            >
                                {showColorPicker.delayed ? "Set" : "Change"}
                            </button>
                        </div>

                        {/* Completed Colour Picker */}
                        <div className="d-flex mt-3 align-items-center">
                            <h5 className="m-3">Completed:</h5>
                            <button
                                className="btn btn-secondary"
                                style={{
                                    backgroundColor: props.colors.completed,
                                }}
                                onClick={() =>
                                    setShowColorPicker((prev) => ({
                                        completed: !prev.completed,
                                    }))
                                }
                            >
                                {showColorPicker.completed ? "Set" : "Change"}
                            </button>
                        </div>
                        <ColorPicker
                            k={"completed"}
                            color={props.colors.completed}
                            showColorPicker={showColorPicker.completed}
                            changeColors={props.changeColors}
                        />

                        <div className="d-flex align-items-center mt-3">
                            <button
                                className="btn btn-primary m-3"
                                onClick={props.switchTheme}
                            >
                                Switch theme
                            </button>
                        </div>
                    </div>
                </Tab>
            </Sidebar>
        </section>
    );
};

export default Sidetabs;
