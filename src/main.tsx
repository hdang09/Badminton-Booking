import { createRoot } from "react-dom/client";
import { makeServer } from "../mocks/server";
import App from "./App.tsx";
import "./index.css";

if (import.meta.env.DEV) {
  makeServer({ environment: "development" });
}

createRoot(document.getElementById("root")!).render(<App />);
