import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import "./listicon.css";

import EditModal from "../../components/EditModal/EditModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

export default function NestedList({ item, fetchItems }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      className="main-list"
      sx={{ width: "10%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse className="button-container" in={open} timeout="auto">
        <EditModal
          item={item}
          handleClick={handleClick}
          fetchItems={fetchItems}
        />
        <DeleteModal
          item={item}
          handleClick={handleClick}
          fetchItems={fetchItems}
        />
      </Collapse>
    </List>
  );
}
