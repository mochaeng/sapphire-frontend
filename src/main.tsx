import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
