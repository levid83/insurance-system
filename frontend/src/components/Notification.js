import { useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/material";

import PropTypes from "prop-types";

function Notification({ type, message, position: { vertical, horizontal } }) {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Stack>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical, horizontal }}
        spacing={2}
        onClose={handleClose}
      >
        <MuiAlert severity={type} sx={{ width: "100%" }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </Stack>
  );
}

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  position: PropTypes.shape({
    vertical: PropTypes.string.isRequired,
    horizontal: PropTypes.string.isRequired,
  }).isRequired,
  terminationDate: PropTypes.string,
};

export default Notification;
