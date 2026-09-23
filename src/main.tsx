import React from "react";
import ReactDOM from "react-dom/client";
import AccessGate from "./AccessGate";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AccessGate />
  </React.StrictMode>
);

// PWA: register service worker if available
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(()=>{});
  });
}
