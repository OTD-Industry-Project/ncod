import React, { useState, useEffect } from "react";
import Switch from "react-switch";

const DarkModeToggle = ({ switchTheme, theme }) => {
    const [checked, setChecked] = useState(theme);

    const handleChange = (nextChecked) => {
        setChecked(nextChecked);
        switchTheme();
    };

    useEffect(() => {
        setChecked(theme);
    }, []);

    return (
        <div>
            <label htmlFor="small-radius-switch">
                <Switch
                    checked={theme}
                    onChange={handleChange}
                    handleDiameter={28}
                    offColor="#0074D9"
                    onColor="#000"
                    offHandleColor="#fff"
                    onHandleColor="#0074D9"
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
