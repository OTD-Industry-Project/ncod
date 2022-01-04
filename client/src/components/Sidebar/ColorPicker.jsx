import React, { useState } from "react";
import { CirclePicker } from "react-color";

const ColorPicker = ({ k, color, showColorPicker, changeColors }) => {
    const [thisColor, setThisColor] = useState(color);

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
                    setThisColor(updatedColor);
                    changeColors(k, updatedColor.hex);
                }}
                // onChangeComplete={changeColors(k, thisColor.hex)}
                // only changes one at a time, not outputing all
            />
        </>
    );
};

export default ColorPicker;
