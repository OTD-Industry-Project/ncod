import React from "react";
import Switch from "react-switch";

/** @module DarkModeToggle */

/**
 * @funtion A toggle that animates on toggle, and sets state theme with a callback
 * @param {callback} switchTheme Callback function to switch theme 
 * @param {boolean} theme Sets inner state according to this.
 * @returns {Component} A toggle
 */
const DarkModeToggle = ({ switchTheme, theme }) => {
    
    /**
     * Initiates the callback to App.js
     * @function handleChange 
     * @description Extends the onChange method provided by react 
     */
    const handleChange = () => {
        switchTheme();
    };

    return (
        <div>
            <label htmlFor="small-radius-switch">
                <Switch
                    checked={theme}
                    onChange={handleChange}
                    handleDiameter={28}
                    offColor="#0074D9"
                    onColor="#23272A"
                    offHandleColor="#fff"
                    onHandleColor="#85b858"
                    height={40}
                    width={70}
                    borderRadius={10}
                    activeBoxShadow="0px 0px 1px 2px #fffc35"
                    uncheckedIcon={
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                fontSize: 28,
                                color: "black",
                                paddingRight: 2,
                            }}
                        >
                            &#9789;
                        </div>
                    }
                    checkedIcon={
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                fontSize: 28,
                                color: "white",
                            }}
                        >
                            &#9788;
                        </div>
                    }
                    uncheckedHandleIcon={
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                fontSize: 28,
                                color: "black",
                            }}
                        >
                            &#9788;
                        </div>
                    }
                    checkedHandleIcon={
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                color: "white",
                                fontSize: 28,
                            }}
                        >
                            &#9789;
                        </div>
                    }
                    className="react-switch"
                    id="small-radius-switch"
                />
            </label>
        </div>
    );
};

export default DarkModeToggle;
