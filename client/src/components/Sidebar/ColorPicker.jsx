import React from "react";
import { CirclePicker } from "react-color";

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
