import React, { useState, useEffect } from "react";
import "./items.css";
import axios from "axios";

import { FaEllipsisV } from "react-icons/fa";

const Items = () => {
  // going to receive a list to render

  const [itemList, setItemList] = useState([]);
  const [headers, setHeaders] = useState([]);

  const rendersHeaders = (items) => {
    const [firstItem] = items;

    let tableHeaders = [];

    for (const key in firstItem) {
      tableHeaders.push(key);
    }

    setHeaders(tableHeaders);
  };

  const renderedHeaders = headers.map((cur) => {
    return <th key={cur}>{cur}</th>;
  });

  const renderedItems = itemList.map((cur) => {
    return (
      <tr>
        <td>{cur.item}</td>
        <td>{cur.price}</td>
        <td>{cur.count}</td>
        <td className="last-column">
          <h2>{cur.category}</h2>
          <FaEllipsisV className="icon filter" />
        </td>
      </tr>
    );
  });

  // before rendering, make API call;

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get(
        "https://inventory-s.herokuapp.com/api/items"
      );

      console.log(response.data);

      setItemList(response.data);
      rendersHeaders(response.data);
    };

    fetchItems();
  }, []);

  return (
    <table className="main-table">
      <thead>
        <tr>{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedItems}</tbody>
    </table>
  );
};

export default Items;
