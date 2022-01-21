import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
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

export default function TransitionsModal({
  items,
  fetchItems,
  text,
  setUserInput,
}) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState({
    item_id: items.id,
    item_name: "",
    item_price: "",
    item_count: "",
    category: "",
  });

  const addItem = async (e) => {
    e.preventDefault();

    // add new item
    await axios.post("https://inventory-s.herokuapp.com/api/items", {
      ...input,
      item_name: capitalizeFirstLetter(input.item_name),
      category: capitalizeFirstLetter(input.category),
      item_price: input.item_price.toString(),
    });

    // request new items
    fetchItems();

    setInput({ item_name: "", item_price: "", item_count: "", category: "" });
    handleClose();
    setUserInput("");
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const onInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button className="add-item" onClick={handleOpen}>
        <h2>{text}</h2>
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
                required
              />
              <br></br>
              <label for="price">Item price: </label>
              <br></br>
              <input
                onChange={onInputChange}
                value={input.item_price}
                type="number"
                name="item_price"
                required
                min="1"
                step="0.01"
              />
              <br></br>
              <label for="item_count">Count:</label>
              <br></br>
              <input
                onChange={onInputChange}
                value={input.item_count}
                type="number"
                name="item_count"
                required
                min="1"
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
              <button type="submit" className={`add-item`}>
                Submit
              </button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
