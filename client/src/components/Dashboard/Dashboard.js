import React from "react";
import "./dashboard.css";

import SearchBar from "../SearchBar/SearchBar";
import Items from "../Items/Items";

const Dashboard = () => {
  return (
    <div className="main-container">
      <SearchBar />
      <Items />
    </div>
  );
};

export default Dashboard;
