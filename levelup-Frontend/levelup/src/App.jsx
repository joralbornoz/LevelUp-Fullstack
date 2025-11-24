// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Eventos from "./pages/Eventos";
import Admin from "./pages/Admin";

import RutaProtegida from "./components/RutaProtegida";
import RutaAdmin from "./components/RutaAdmin";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/login" element={<Login />} />

        {/* Perfil usuario normal */}
        <Route
          path="/perfil"
          element={
            <RutaProtegida>
              <Perfil />
            </RutaProtegida>
          }
        />

        {/* Panel exclusivo ADMIN */}
        <Route
          path="/admin"
          element={
            <RutaAdmin>
              <Admin />
            </RutaAdmin>
          }
        />
      </Routes>
    </>
  );
}

export default App;
