import { useEffect } from "react";
import AppProvider from "./providers/AppProvider";
import AppRoute from "./routes/AppRoute";

function App() {
  useEffect(() => {
    localStorage.setItem("ownerId", "2");
  }, []);

  return (
    <AppProvider>
      <AppRoute />
    </AppProvider>
  );
}

export default App;
