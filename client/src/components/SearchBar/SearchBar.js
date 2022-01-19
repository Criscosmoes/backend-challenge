import React from "react";
import "./searchbar.css";
import axios from "axios";

// icons
import { BiFilter } from "react-icons/bi";

// components
import Modal from "../../components/Modal/Modal";

const SearchBar = ({ items, fetchItems, setItems }) => {
  const fetchFilteredItems = async (term) => {
    if (!term) {
      const response = await axios.get(`http://localhost:4000/api/items`);
      setItems(response.data);
      return;
    }

    const response = await axios.get(`http://localhost:4000/api/items/${term}`);

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
        <Modal items={items} fetchItems={fetchItems} text={"Add new Item"} />
      </div>
    </ul>
  );
};

export default SearchBar;
