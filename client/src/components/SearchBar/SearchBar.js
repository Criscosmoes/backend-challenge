import React from "react";
import "./searchbar.css";

// icons
import { BiFilter } from "react-icons/bi";
import { RiAddFill } from "react-icons/ri";

const SearchBar = () => {
  return (
    <ul className="searchbar-container">
      <form className="form-container">
        <input type="text" placeholder="Search Inventory..."></input>
      </form>
      <div className="icon-container">
        <button>
          <BiFilter className="filter-icon" />
        </button>
        <button className="add-item">
          <h2>Add new Item</h2>
          <RiAddFill className="icon" />
        </button>
      </div>
    </ul>
  );
};

export default SearchBar;
