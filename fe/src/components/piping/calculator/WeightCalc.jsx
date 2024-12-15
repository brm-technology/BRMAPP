import React, { useState } from "react";
import './WeightCalc.css';

const WeightCalc = ({ title, description }) => {
  const [Od, setOd] = useState("");
  const [Thk, setThk] = useState("");
  const [Ro, setRo] = useState("");
  const [FRo, setFRo] = useState("");
  const [emptyweight, setWeight] = useState(null);
  const [fullweight, setFWeight] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputErrors, setInputErrors] = useState({
    Od: false,
    Thk: false,
    Ro: false,
    FRo: false,
  });

  const handleCalculate = () => {
    // Reset error message and input errors
    setErrorMessage("");
    setInputErrors({ Od: false, Thk: false, Ro: false, FRo: false });

    // Validate inputs
    const isOdValid = !isNaN(parseFloat(Od)) && Od.trim() !== "";
    const isThkValid = !isNaN(parseFloat(Thk)) && Thk.trim() !== "";
    const isRoValid = !isNaN(parseFloat(Ro)) && Ro.trim() !== "";
    const isFRoValid = !isNaN(parseFloat(FRo)) && FRo.trim() !== "";

    if (isOdValid && isThkValid && isRoValid && isFRoValid) {
      // Convert inputs to numbers and calculate weight
      const weightValue = (
        ((parseFloat(Od) * parseFloat(Thk) -
          parseFloat(Thk) * parseFloat(Thk)) /
          1000000) *
        parseFloat(Ro) *
        Math.PI // Use Math.PI for a more precise value of π
      ).toFixed(2);
      setWeight(weightValue);

      const fweightValue = (
        (((((parseFloat(Od) - 2 * parseFloat(Thk)) *
          (parseFloat(Od) - 2 * parseFloat(Thk))) /
          1000000) *
          parseFloat(FRo)) /
          4) *
        Math.PI
      ).toFixed(2);
      setFWeight(fweightValue);
    } else {
      setErrorMessage("Please Fill Empty Fields");

      // Set which inputs are invalid
      setInputErrors({
        Od: !isOdValid,
        Thk: !isThkValid,
        Ro: !isRoValid,
        FRo: !isFRoValid,
      });
    }
  };

  const handleChange = (e) => {
    // Reset weight and error message when any input changes
    setWeight(null);
    setFWeight(null);
    setErrorMessage("");

    // Handle input change
    switch (e.target.name) {
      case "Od":
        setOd(e.target.value);
        break;
      case "Thk":
        setThk(e.target.value);
        break;
      case "Ro":
        setRo(e.target.value);
        break;
      case "FRo":
        setFRo(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <label className="form-label">
          Pipe Outside Diameter (mm):
          <input
            type="number"
            className={`form-control text-center ${
              inputErrors.Od ? "border-danger bg-light-danger" : ""
            }`}
            name="Od"
            value={Od}
            onChange={handleChange}
            style={inputErrors.Od ? { backgroundColor: "#f8d7da" } : {}}
          />
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Pipe Wall Thickness (mm):
          <input
            type="number"
            className={`form-control text-center ${
              inputErrors.Thk ? "border-danger bg-light-danger" : ""
            }`}
            name="Thk"
            value={Thk}
            onChange={handleChange}
            style={inputErrors.Thk ? { backgroundColor: "#f8d7da" } : {}}
          />
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Pipe Material Density (kg/m³):
          <input
            type="number"
            className={`form-control text-center ${
              inputErrors.Ro ? "border-danger bg-light-danger" : ""
            }`}
            name="Ro"
            value={Ro}
            onChange={handleChange}
            style={inputErrors.Ro ? { backgroundColor: "#f8d7da" } : {}}
          />
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Fluid Density (kg/m³):
          <input
            type="number"
            className={`form-control text-center ${
              inputErrors.FRo ? "border-danger bg-light-danger" : ""
            }`}
            name="FRo"
            value={FRo}
            onChange={handleChange}
            style={inputErrors.FRo ? { backgroundColor: "#f8d7da" } : {}}
          />
        </label>
      </div>
      <button className="btn btn-primary mb-3" onClick={handleCalculate}>
        Calculate Weight
      </button>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {emptyweight !== null && (
        <p className="result-text">
          The Empty Pipe weight per Length is: <strong>{emptyweight}</strong>{" "}
          kg/m
        </p>
      )}
      {fullweight !== null && (
        <p className="result-text">
          The Fluid Weight Inside the Pipe per Length is:{" "}
          <strong>{fullweight}</strong> kg/m
        </p>
      )}
    </div>
  );
};

export default WeightCalc;
