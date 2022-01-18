import React from "react";
import "./searchbar.css";

const SearchBar = () => {
  return (
    <ul className="searchbar-container">
      <form className="form-container">
        <input type="text" placeholder="Search Inventory..."></input>
      </form>
    </ul>
  );
};

export default SearchBar;
