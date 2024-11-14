import React from "react";
import { createRoot } from "react-dom/client"; // Asegúrate de usar 'react-dom/client'
import App from "./App"; // Tu componente principal
import './styles.css'; // Estilos

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement); // Usando createRoot
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("No se encontró el elemento con id 'root'.");
}
