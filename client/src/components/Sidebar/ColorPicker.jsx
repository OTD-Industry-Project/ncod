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
                    "#8ED1FC",
                    "#228B22",
                    "#00D084",
                    "#FF4500",
                    "#FF9800",
                    "#FFEB3B",
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
