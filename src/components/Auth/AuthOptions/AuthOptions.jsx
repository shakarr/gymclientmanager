import React from "react";
import { Button } from "semantic-ui-react";

import "./authOptions.scss";

export function AuthOptions(props) {
  const { openLogin } = props;

  return (
    <div className="auth-options">
      <h1>Bienvenido/a al gestor de clientes</h1>

      <Button className="login" onClick={openLogin}>
        Inicia sesión
      </Button>
    </div>
  );
}
