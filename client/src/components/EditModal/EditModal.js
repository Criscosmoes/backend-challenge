import React, { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import axios from "axios";

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

export default function TransitionsModal({ item, handleClick, fetchItems }) {
  const currentUser = {
    item_id: item.id,
    item_name: item.item,
    item_price: item.price,
    item_count: item.count,
    category: item.category,
  };

  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState(currentUser);
  const [disabled, setDisabled] = React.useState(false);

  const onInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // udpate item in db
      await axios.put("https://inventory-s.herokuapp.com/api/items", {
        ...input,
      });

      // request new items
      fetchItems();

      setDisabled(true);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpen = () => {
    setOpen(true);
    setDisabled(false);
  };
  const handleClose = () => {
    setOpen(false);
    handleClick(!true);
  };

  return (
    <div>
      <button className="button" onClick={handleOpen}>
        <h2>Edit</h2>
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
            <form onSubmit={onSubmit} className="add-item-container">
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
                type="text"
                name="item_price"
                required
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
                required
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
