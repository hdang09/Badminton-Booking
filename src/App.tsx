import AppProvider from "./providers/AppProvider";
import AppRoute from "./routes/AppRoute";

function App() {
  return (
    <AppProvider>
      <AppRoute />
    </AppProvider>
  );
}

export default App;
