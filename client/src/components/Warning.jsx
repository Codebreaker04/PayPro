import React, { useEffect, useState } from "react";
import { Stack, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function Warning({ label, handleClose }) {
  useEffect(() => {
    const timer = setTimeout(() => handleClose(), 3000);

    return () => clearTimeout(timer);
  }, [handleClose]);

  return (
    <div className="absolute w-full">
      <Stack sx={{ width: "100%" }} spacing={2}>
        {
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                onClick={handleClose}
                size="small"
              >
                {/*<CloseIcon fontSize="inherit" />*/}
              </IconButton>
            }
          >
            {label}
          </Alert>
        }
      </Stack>
    </div>
  );
}
