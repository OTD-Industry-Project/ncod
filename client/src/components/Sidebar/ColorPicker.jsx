import React, { useState } from "react";
import { CirclePicker } from "react-color";

const ColorPicker = ({ k, color, showColorPicker, changeColors }) => {
    const [thisColor, setThisColor] = useState(color);
    return (
        <>
            
                <CirclePicker
                width="182px"
                    color={thisColor}
                    colors={["#1E90FF", "#8ED1FC", "#228B22", "#00D084", "#FF4500", "#FF9800", "#FFEB3B", "#A9A9A9"]}
                    onChange={(updatedColor) => {
                        setThisColor(updatedColor);
                    }}
                    onChangeComplete={changeColors(k, thisColor.hex)}
                />
            
        </>
    );
};

export default ColorPicker;
