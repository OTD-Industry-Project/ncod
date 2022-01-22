/*
 * Authors: James Hawes, Jamie Garner, Joseph Ising, Mark Dodson
 * -----
 * Created Date: Fri Dec 24 2021
 * -----
 * Last Modified: Sat Jan 22 2022
 */

import React from "react";
import { CirclePicker } from "react-color";

/** @module ColorPicker */

/**
 * @function ColorPicker
 * @param {number} k Unique key to identify which color picker this is. Allows multiple to be rendered.
 * @param {string} color Hex code for current selected color
 * @param {callback} changeColors Callback to update global color scheme
 * @returns {Component} A color Picker containing 8 predefined colors.
 *
 * 4 seperate color pickers being rendered:
 * <img src="color-picker.png" >
 */
const ColorPicker = ({ k, color, changeColors }) => {
    return (
        <>
            <CirclePicker
                width="364px"
                color={color}
                colors={[
                    "#1E90FF",
                    "#85C0F9",
                    "#228B22",
                    "#00D084",
                    "#FF4500",
                    "#F5793A",
                    "#C9B458",
                    "#A9A9A9",
                ]}
                onChange={(updatedColor) => {
                    changeColors(k, updatedColor.hex);
                }}
            />
        </>
    );
};

export default ColorPicker;
