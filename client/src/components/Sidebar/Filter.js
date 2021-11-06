import React from "react";
import "./Sidebar.css";

// Return a simple input field. Updates the filter prop with every key typed
export const Filter = ({ filter, setFilter }) => {
    return (
        <div className="Search">
            <input
                value={filter || ""}
                onChange={(e) => setFilter(e.target.value)}
                className="form-control"
                placeholder="Search"
                aria-label="Search"
            />
        </div>
    );
};
