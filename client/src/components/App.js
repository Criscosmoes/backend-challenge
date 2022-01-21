import React, { useEffect } from "react";
import axios from "axios";

// css
import "../App.css";

// components
import NavBar from "./NavBar/NavBar";
import Dashboard from "./Dashboard/Dashboard";

const App = () => {
  const [items, setItems] = React.useState([]);
  const [headers, setHeaders] = React.useState([]);

  function rendersHeaders(items) {
    const [firstItem] = items;

    let tableHeaders = [];

    for (const key in firstItem) {
      if (key != "id") {
        tableHeaders.push(key);
      }
    }

    setHeaders(tableHeaders);
  }

  const fetchItems = async () => {
    const response = await axios.get(
      "https://inventory-s.herokuapp.com/api/items"
    );

    setItems(response.data);
    rendersHeaders(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="app-container">
      <NavBar />
      <Dashboard
        items={items}
        setItems={setItems}
        headers={headers}
        fetchItems={fetchItems}
      />
    </div>
  );
};

export default App;
