/*
 * Authors: James Hawes, Jamie Garner, Joseph Ising, Mark Dodson
 * -----
 * Created Date: Tue Nov 30 2021
 * -----
 * Last Modified: Sat Jan 22 2022
 */

import React from "react";
import "./Sidebar.css";

/** @module Filter */

/**
 * Return a simple input field. Updates the filter prop with every key typed
 * @function Filter
 * @param {string} filter The value after being filtered 
 * @param {callback} setFilter Sets the value in the parent method
 * @returns {Component} A search bar
 * 
 * <img src="search-bar.png" >
 */
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