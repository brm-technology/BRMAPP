import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BeamData.css";
import CbeamEN1003651 from "./images/CbeamEN1003651.png";
import CbeamEN1003652 from "./images/CbeamEN1003652.png";
import IbeamEN1003651 from "./images/IbeamEN1003651.png";
import IbeamEN1003652 from "./images/IbeamEN1003652.png";

const BeamEN10365Data = ({ title, description }) => {
  const [beams, setBeams] = useState([]);
  const [filteredBeams, setFilteredBeams] = useState([]);
  const [profTypeOptions, setProfTypeOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [selectedProfType, setSelectedProfType] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const imageMapping = {
    IPE: IbeamEN1003651,
    HE: IbeamEN1003651,
    HL: IbeamEN1003651,
    HD: IbeamEN1003651,
    HP: IbeamEN1003651,
    UBP: IbeamEN1003651,
    UB: IbeamEN1003651,
    UC: IbeamEN1003651,
    I: IbeamEN1003652,
    IPN: IbeamEN1003652,
    J: IbeamEN1003652,
    HLZ: IbeamEN1003652,
    UPE: CbeamEN1003651,
    PFC: CbeamEN1003651,
    UPN: CbeamEN1003652,
    U: CbeamEN1003652,
    CH: CbeamEN1003652,
  };

  useEffect(() => {
    // Define customOrder inside useEffect
    const customOrder = [
      "IPE", "HE", "HL", "HD", "HP", "UBP", "UB", "UC",
      "I", "IPN", "J", "HLZ",
      "UPE", "PFC",
      "UPN", "U", "CH",
    ];

    const apiUrl = "/api/beam/en10365/";

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        setBeams(data);
        setFilteredBeams(data);

        const profTypes = [...new Set(data.map((beam) => beam.Proftype))];
        const sortedProfTypes = profTypes.sort(
          (a, b) => customOrder.indexOf(a) - customOrder.indexOf(b)
        );
        setProfTypeOptions(sortedProfTypes);

        setSizeOptions([]); // Reset Size options initially
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // No dependencies needed for customOrder now

  useEffect(() => {
    let filtered = beams;

    if (selectedProfType) {
      filtered = filtered.filter((beam) => beam.Proftype === selectedProfType);

      const sizes = [...new Set(filtered.map((beam) => beam.Size))];
      const sortedSizes = sizes.sort((a, b) => {
        const getFirstNumber = (str) => {
          const match = str.match(/\d+/); // Extract the first number from the string
          return match ? parseInt(match[0], 10) : Infinity;
        };
        return getFirstNumber(a) - getFirstNumber(b);
      });
      setSizeOptions(sortedSizes);
    } else {
      setSizeOptions([]);
    }

    if (selectedSize) {
      filtered = filtered.filter((beam) => beam.Size === selectedSize);
    }

    setFilteredBeams(filtered);
  }, [selectedProfType, selectedSize, beams]);

  const selectedImage = imageMapping[selectedProfType] || CbeamEN1003651;

  return (
    <div className="container">
      <br />
      <div className="filters">
        <label className="dropdown-label">
          Profile Type:&ensp;
          <select
            value={selectedProfType}
            onChange={(e) => {
              setSelectedProfType(e.target.value);
              setSelectedSize("");
            }}
          >
            <option value="">Please select...</option>
            {profTypeOptions.map((profType) => (
              <option key={profType} value={profType}>
                {profType}
              </option>
            ))}
          </select>
        </label>
        <label className="dropdown-label">
          Size:&ensp;
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            disabled={!selectedProfType}
          >
            <option value="">Please select...</option>
            {sizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>
      {selectedProfType && selectedSize && (
        <div className="beam-details">
          <hr />
          <h6>
            {selectedProfType} - {selectedSize}
          </h6>
          {filteredBeams.map((beam) => (
            <div key={beam.id} className="beam">
              <table className="specs-table">
                <tbody>
                  <tr>
                    <td>
                      <strong>Height (h):</strong> {beam.h} mm
                    </td>
                    <td>
                      <strong>Width (b):</strong> {beam.b} mm
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Web Thickness (s):</strong> {beam.s} mm
                    </td>
                    <td>
                      <strong>Flange Thickness (t):</strong> {beam.t} mm
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <strong>Section Area:</strong> {beam.Secarea} cm²
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      <img
                        className="img-show"
                        src={selectedImage}
                        alt="Beam illustration"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BeamEN10365Data;
