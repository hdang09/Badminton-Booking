import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { makeServer } from "../mocks/server";

makeServer({ environment: "development" });

createRoot(document.getElementById("root")!).render(<App />);
