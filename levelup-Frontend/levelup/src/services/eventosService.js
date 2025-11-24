// src/services/eventosService.js

export const eventosGamer = [
  {
    nombre: "Game Show Santiago",
    coords: [-33.4489, -70.6693],
    puntos: 100,
  },
  {
    nombre: "Expo Gamer Valparaíso",
    coords: [-33.0472, -71.6127],
    puntos: 80,
  },
  {
    nombre: "Concurso Cosplay Antofagasta",
    coords: [-23.6509, -70.3975],
    puntos: 60,
  },
  {
    nombre: "Torneo Esports Concepción",
    coords: [-36.8201, -73.0444],
    puntos: 120,
  },
];


export function agregarEventosAlMapa(map) {
  eventosGamer.forEach((evento) => {
    window.L.marker(evento.coords)
      .addTo(map)
      .bindPopup(
        `<strong>${evento.nombre}</strong><br>🎯 Puntos: ${evento.puntos}`
      );
  });
}
