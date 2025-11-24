// src/pages/Eventos.jsx
import { useEffect } from "react";
import "../styles/styles.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { agregarEventosAlMapa } from "../services/eventosService";

function Eventos() {
  useEffect(() => {
    
    window.L = L;

    const map = L.map("map").setView([-33.45, -70.66], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(map);

    agregarEventosAlMapa(map);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>📍 Mapa de Eventos Gamer en Chile</h2>
      <p style={{ textAlign: "center" }}>
        Asiste a eventos oficiales y gana puntos <strong>LevelUp</strong> 🎮
      </p>

      <div
        id="map"
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      ></div>

      <footer>
        <p>&copy; 2025 Level-Up Gamer</p>
      </footer>
    </>
  );
}

export default Eventos;
