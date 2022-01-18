import React from "react";

// css
import "../App.css";

// components
import NavBar from "./NavBar/NavBar";
import Dashboard from "./Dashboard/Dashboard";

const App = () => {
  /* const onButtonClick = async () => {
    const res = await axios.post(
      "https://inventory-s.herokuapp.com/api/items",
      {
        item_name: "Buy Shoes",
        item_price: "12.44",
        item_count: 2,
        category: "Shoes",
      }
    );

    console.log(res);
  }; */

  return (
    <div className="app-container">
      <NavBar />
      <Dashboard />
    </div>
  );
};

export default App;
