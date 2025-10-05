import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <AppRoutes />
    </Router>
  );
}

export default App;
