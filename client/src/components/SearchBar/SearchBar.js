import React, { useState } from "react";
import "./searchbar.css";
import axios from "axios";

import FilterModal from "../../components/FilterModal/FilterModal";

// components
import Modal from "../../components/Modal/Modal";

const SearchBar = ({ items, fetchItems, setItems }) => {
  const [userInput, setUserInput] = useState("");

  const fetchFilteredItems = async (term) => {
    setUserInput(term);
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
          value={userInput}
        ></input>
      </form>
      <div className="icon-container">
        <FilterModal
          items={[]}
          fetchItems={fetchItems}
          setItems={setItems}
          setUserInput={setUserInput}
        />
        <Modal
          items={items}
          fetchItems={fetchItems}
          text={"Add new Item"}
          setUserInput={setUserInput}
        />
      </div>
    </ul>
  );
};

export default SearchBar;
