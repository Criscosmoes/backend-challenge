import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import axios from "axios";
import "./deletemodal.css";
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
  console.log(item);
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const onSubmit = async (e) => {
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
        <h2>Delete</h2>
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
            <div className="delete-container">
              <h2>Are you sure you want to delete</h2>
              <h3>{item.item}?</h3>
              <button onClick={onSubmit} className="add-item">
                Yes, I do!
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
