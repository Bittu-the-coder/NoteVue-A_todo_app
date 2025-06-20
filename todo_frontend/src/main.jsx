import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";
import {
  registerServiceWorker,
  setupServiceWorkerUpdateNotification,
} from "./utils/serviceWorker";

// Register service worker for PWA support
registerServiceWorker();
setupServiceWorkerUpdateNotification();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
