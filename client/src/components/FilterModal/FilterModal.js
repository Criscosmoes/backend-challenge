import React, { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import axios from "axios";

import "./filtermodal.css";
// icons
import { BiFilter } from "react-icons/bi";
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
  handleClick,
  fetchItems,
  setUserInput,
}) {
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [categories, setCategories] = React.useState([]);

  /* const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // delete item in db
      await axios.delete("http://localhost:4000/api/items", {
        data: { item_id: item.id },
      });

      // request new items
      fetchItems();

      setDisabled(true);
      handleClose();
    } catch (error) {
      console.log(error);
    }

    setUserInput("")

    
  }; */
  const handleOpen = () => {
    setOpen(true);
    setDisabled(false);
  };
  const handleClose = () => {
    setOpen(false);
    handleClick(!true);
  };

  const renderedCategories = categories.map((cur) => {
    return <option value={cur.name}>{cur.name}</option>;
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await axios.get(
        "https://inventory-s.herokuapp.com/api/categories"
      );
      setCategories(categories.data);
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <button onClick={handleOpen}>
        <BiFilter className="filter-icon" />
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
            <div>
              <form className="delete-container">
                <h2>SELECT CATEGORY: </h2>
                <select>
                  <option></option>
                  {renderedCategories}
                </select>

                <div className="label-container">
                  <h2>FILTER BY: </h2>
                  <label for="price">
                    <input type="checkbox" name="price" value="price" />
                    Price
                  </label>

                  <label for="count">
                    <input type="checkbox" name="count" value="count" />
                    Count
                  </label>

                  <label for="category">
                    <input type="checkbox" name="category" value="category" />
                    Category
                  </label>
                </div>
                <button type="submit" className={`add-item`}>
                  Filter!
                </button>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
