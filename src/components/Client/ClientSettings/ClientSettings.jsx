import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import "./clientSettings.scss";

export const ClientSettings = (props) => {
  const { handleCloseModal, id } = props;

  return (
    <div>
      <div>
        <Button
          component={Link}
          variant="contained"
          size="medium"
          to={`/dietas-cliente/${id}`}
        >
          Dietas Cliente
        </Button>
      </div>
    </div>
  );
};
