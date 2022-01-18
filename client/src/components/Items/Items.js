import React, { useState, useEffect } from "react";
import "./items.css";

import { FaEllipsisV } from "react-icons/fa";

const Items = ({ items, headers }) => {
  // going to receive a list to render

  const renderedHeaders = headers.map((cur) => {
    return <th key={cur}>{cur}</th>;
  });

  const renderedItems = items.map((cur) => {
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
