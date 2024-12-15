import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AppNavbar from "./components/main/Navbar";
import Home from "./components/main/Home";
import Piping from "./components/piping/Piping";
import Structural from "./components/structural/Structural";
import ContactUs from "./components/contactus/ContactUs";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="content-box">
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/piping" element={<Piping />} />
            <Route path="/structural" element={<Structural />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
