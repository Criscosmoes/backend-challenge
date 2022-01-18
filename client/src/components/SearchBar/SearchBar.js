import React from "react";
import "./searchbar.css";
import axios from "axios";

// icons
import { BiFilter } from "react-icons/bi";
import { RiAddFill } from "react-icons/ri";

// components
import Modal from "../../components/Modal/Modal";

const SearchBar = ({ items, fetchItems, setItems }) => {
  const fetchFilteredItems = async (term) => {
    if (!term) {
      const response = await axios.get(
        `https://inventory-s.herokuapp.com/api/items`
      );
      setItems(response.data);
      return;
    }

    const response = await axios.get(
      `https://inventory-s.herokuapp.com/api/items/${term}`
    );

    setItems(response.data.rows);
  };

  return (
    <ul className="searchbar-container">
      <form className="form-container">
        <input
          onChange={(e) => fetchFilteredItems(e.target.value)}
          type="text"
          placeholder="Search Inventory..."
        ></input>
      </form>
      <div className="icon-container">
        <button>
          <BiFilter className="filter-icon" />
        </button>
        <Modal items={items} fetchItems={fetchItems} />
      </div>
    </ul>
  );
};

export default SearchBar;
