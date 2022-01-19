import React from "react";
import "./dashboard.css";

import SearchBar from "../SearchBar/SearchBar";
import Items from "../Items/Items";

const Dashboard = ({ items, headers, fetchItems, setItems }) => {
  return (
    <div className="main-container">
      <SearchBar items={items} fetchItems={fetchItems} setItems={setItems} />
      <Items items={items} headers={headers} fetchItems={fetchItems} />
    </div>
  );
};

export default Dashboard;
