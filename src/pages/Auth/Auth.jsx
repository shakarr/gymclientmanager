import { useState } from "react";
import { AuthOptions, LoginForm } from "../../components/Auth";

import "./auth.scss";

export function Auth() {
  const [typeForm, setTypeForm] = useState(null);

  const openLogin = () => setTypeForm("login");
  const openRegister = () => setTypeForm("register");

  const renderForm = () => {
    if (typeForm === "login") {
      return <LoginForm />;
    }

    return <AuthOptions openLogin={openLogin} openRegister={openRegister} />;
  };

  return (
    <div className="auth">
      <div className="auth__content">{renderForm()}</div>
    </div>
  );
}
