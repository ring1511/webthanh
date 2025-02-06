import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Details from "./components/Detail/Details";
import Panel from "./pages/Panel/Panel";
import ProtectedRoute from "./utils/protectedRouter";
import Loadding from "./components/Loading/loading";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Footer />} />
          <Route path="/san-pham/:tag" element={<Details />} />
          <Route path="/loading" element={<Loadding />} />
          <Route
            path="/panel"
            element={
              <ProtectedRoute>
                <Panel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
