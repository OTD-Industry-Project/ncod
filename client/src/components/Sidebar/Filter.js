import React from "react";
import "./Sidebar.css";

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
