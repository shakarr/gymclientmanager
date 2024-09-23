import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";

import { LoggedLayout } from "../layouts";
import { Dietas, Home, ClientDietsView } from "../pages";

export function LoggedNavigation() {
  return (
    <HashRouter>
      <LoggedLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dietas" element={<Dietas />} />
          <Route
            path="/dietas-cliente/:id/:name"
            element={<ClientDietsView />}
          />
        </Routes>
      </LoggedLayout>
    </HashRouter>
  );
}
