import React from "react";
import "./items.css";
import ListIcon from "../../components/ListIcon/ListIcon";

const Items = ({ items, headers, fetchItems }) => {
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
          <ListIcon item={cur} fetchItems={fetchItems} />
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
