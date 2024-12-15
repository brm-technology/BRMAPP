import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BeamData.css";
import beamImage from "./images/BeamEN100561.png";

const BeamEN100561Data = ({ title, description }) => {
  const [beams, setBeams] = useState([]);
  const [filteredBeams, setFilteredBeams] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const apiUrl = "/api/beam/en100561/";

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        setBeams(data);
        setFilteredBeams(data);

        // Extract and sort sizes based on the number before the first 'x'
        const sizes = [...new Set(data.map((beam) => beam.Size))];
        const sortedSizes = sizes.sort((a, b) => {
          const aSize = parseInt(a.split("x")[0]);
          const bSize = parseInt(b.split("x")[0]);
          return aSize - bSize;
        });
        setSizeOptions(sortedSizes);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedSize) {
      setFilteredBeams(beams.filter((beam) => beam.Size === selectedSize));
    } else {
      setFilteredBeams(beams);
    }
  }, [selectedSize, beams]);

  return (
    <div className="container">
      <br />
      <div className="filters">
        <label className="dropdown-label">
          Size:&ensp;
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
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
      {selectedSize && (
        <div className="beam-details">
          <hr />
          <h6>Leg Angel {selectedSize}</h6>
          {filteredBeams.map((beam) => (
            <div key={beam.id} className="beam">
              <table className="specs-table">
                <tbody>
                  <tr>
                    <td>
                      <strong>Height (h):</strong> {beam.a} mm
                    </td>
                    <td>
                      <strong>Width (b):</strong> {beam.b} mm
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Thickness (t):</strong> {beam.t} mm
                    </td>
                    <td>
                      <strong>Corner Radius (r):</strong> {beam.r} mm
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <strong>Section Area:</strong> {beam.Secarea} cm²
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      <img className="img-show" src={beamImage} alt="Beam illustration" />
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

export default BeamEN100561Data;
