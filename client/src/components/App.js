import React from "react";
import axios from "axios";

const App = () => {
  const onButtonClick = async () => {
    const res = await axios.post("http://localhost:4000/api/items", {
      item_name: "Buy Shoes",
      item_price: "12.44",
      item_count: 2,
      category: "Shoes",
    });

    console.log(res);
  };

  return (
    <div>
      <button onClick={onButtonClick}>Click here to add item</button>
    </div>
  );
};

export default App;
