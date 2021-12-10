import React, { useState } from "react";
import { SketchPicker } from "react-color";

const ColorPicker = ({ k, color, showColorPicker, changeColors }) => {
    const [thisColor, setThisColor] = useState(color);
    return (
        <>
            {showColorPicker && (
                <SketchPicker
                    color={thisColor}
                    onChange={(updatedColor) => {
                        setThisColor(updatedColor);
                    }}
                    onChangeComplete={changeColors(k, thisColor.hex)}
                />
            )}
        </>
    );
};

export default ColorPicker;
