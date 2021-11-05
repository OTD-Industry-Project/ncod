import React, { useMemo } from "react";
import { useTable } from "react-table";
import "./Sidebar.css";
import TEST_DATA from "../../data/TEST_DATA.json";

export const Sidebar = () => {
    const randomNumber = Math.floor(Math.random() * 20);

    let chosenEntries = [];
    let randomEntriesIndices = [];

    for (let i = 0; i < randomNumber; i++) {
        randomEntriesIndices.push(i);
    }

    this.shuffle(randomQuestionIndices);

    return <div>Sidebar</div>;
};

export default Sidebar;
