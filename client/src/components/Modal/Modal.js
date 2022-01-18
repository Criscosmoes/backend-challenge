import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import axios from "axios";
import { RiAddFill } from "react-icons/ri";
import "./modal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({ items, fetchItems }) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState({
    item_name: "",
    item_price: "",
    item_count: "",
    category: "",
  });
  const [disabled, setDisabled] = React.useState(true);

  const addItem = async (e) => {
    e.preventDefault();

    // add new item
    await axios.post("https://inventory-s.herokuapp.com/api/items", {
      ...input,
      item_count: parseInt(input.item_count),
    });

    // request new items
    fetchItems();

    setInput({ item_name: "", item_price: "", item_count: "", category: "" });
    setDisabled(true);
    handleClose();
  };

  const onInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });

    const { item_name, item_price, item_count, category } = input;

    if (item_name && item_price && item_count && category) {
      setDisabled(false);
    }

    console.log(input);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button className="add-item" onClick={handleOpen}>
        <h2>Add new Item</h2>
        <RiAddFill className="icon" />
      </button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form onSubmit={addItem} className="add-item-container">
              <label for="item">Item name:</label>
              <br></br>
              <input
                onChange={onInputChange}
                value={input.item_name}
                type="text"
                name="item_name"
              />
              <br></br>
              <label for="price">Item price: </label>
              <br></br>
              <input
                onChange={onInputChange}
                value={input.item_price}
                type="text"
                name="item_price"
              />
              <br></br>
              <label for="item_count">Count:</label>
              <br></br>
              <input
                onChange={onInputChange}
                value={input.item_count}
                type="text"
                name="item_count"
              />
              <br></br>
              <label for="category">Category:</label>
              <br></br>
              <input
                onChange={onInputChange}
                value={input.category}
                type="text"
                name="category"
              />
              <br></br>
              <button
                disabled={disabled}
                type="submit"
                className={`add-item ${disabled ? "disabled" : ""}`}
              >
                Submit
              </button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
