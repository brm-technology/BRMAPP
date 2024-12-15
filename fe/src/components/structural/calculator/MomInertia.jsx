import React, { useState } from "react";
import "./MomInertia.css";
import Circular from './images/Circularbeam.png';
import Rectangular from './images/Rectangularbeam.png';
import IBeam from './images/Ibeam.png';

const MomInertiaCalc = () => {
  const [beamType, setBeamType] = useState("");
  const [dimensions, setDimensions] = useState({});
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDimensions((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const calculateInertia = () => {
    let Ixx = 0, Iyy = 0, area = 0;

    switch (beamType) {
      case "Circular":
        const { radius } = dimensions;
        if (radius) {
          Ixx = Iyy = (Math.PI * Math.pow(radius, 4)) / 4;
          area = Math.PI * Math.pow(radius, 2);
        }
        break;

      case "Rectangular":
        const { width, height } = dimensions;
        if (width && height) {
          Ixx = (width * Math.pow(height, 3)) / 12;
          Iyy = (height * Math.pow(width, 3)) / 12;
          area = width * height;
        }
        break;

      case "I":
        const { h, b, t, tw } = dimensions;
        if (h && b && t && tw) {
          const flangeArea = b * t;
          const webArea = (h - 2 * t) * tw;
          const totalArea = 2 * flangeArea + webArea;

          const IxxFlange = (b * Math.pow(t, 3)) / 12 + flangeArea * Math.pow(h / 2 - t / 2, 2);
          const IxxWeb = (tw * Math.pow(h - 2 * t, 3)) / 12;
          Ixx = 2 * IxxFlange + IxxWeb;

          const IyyFlange = ((t * Math.pow(b, 3)) / 12);
          const IyyWeb = ((h - 2 * t) * Math.pow(tw, 3)) / 12;
          Iyy = 2 * IyyFlange + IyyWeb;

          area = totalArea;
        }
        break;


      default:
        break;
    }

    setResults({ Ixx, Iyy, area });
};

  const getImageForBeamType = () => {
    switch (beamType) {
      case "Circular":
        return Circular;
      case "Rectangular":
        return Rectangular;
      case "I":
        return IBeam;
      default:
        return null;
    }
  };

  const beamImage = getImageForBeamType();

  return (
    <div className="center-container">
      <div className="beam-calculator">
        <div className="beam-selector">
          <label>
            Select Beam Type:&ensp;
            <select
              value={beamType}
              onChange={(e) => {
                setBeamType(e.target.value);
                setDimensions({});
                setResults(null);
              }}
            >
              <option value="">Select...</option>
              <option value="Circular">Circular</option>
              <option value="Rectangular">Rectangular</option>
              <option value="I">I-Type</option>
            </select>
          </label>
        </div>

        {beamType && (
          <>
            <div className="dimension-inputs">
              {beamType === "Circular" && (
                <label>
                  Radius (r):&ensp;
                  <input
                    type="number"
                    name="radius"
                    value={dimensions.radius || ""}
                    onChange={handleInputChange}
                  />
                </label>
              )}

              {beamType === "Rectangular" && (
                <>
                  <label>
                    Width (b):&ensp;
                    <input
                      type="number"
                      name="width"
                      value={dimensions.width || ""}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Height (h):&ensp;
                    <input
                      type="number"
                      name="height"
                      value={dimensions.height || ""}
                      onChange={handleInputChange}
                    />
                  </label>
                </>
              )}

              {beamType === "I" && (
                <>
                  <label>
                    Total Height (h):&ensp;
                    <input
                      type="number"
                      name="h"
                      value={dimensions.h || ""}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Flange Width (b):&ensp;
                    <input
                      type="number"
                      name="b"
                      value={dimensions.b || ""}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Flange Thickness (t):&ensp;
                    <input
                      type="number"
                      name="t"
                      value={dimensions.t || ""}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Web Thickness (s):&ensp;
                    <input
                      type="number"
                      name="tw"
                      value={dimensions.tw || ""}
                      onChange={handleInputChange}
                    />
                  </label>
                </>
              )}

            </div>

            {beamImage && (
              <div>
                <img className="beam-image" src={beamImage} alt={`${beamType} Beam`} />
              </div>
            )}

            <button onClick={calculateInertia}>Calculate</button>
          </>
        )}

        {results && (
          <div className="results">
            <p>
              <strong>Moment of Inertia (Ix):</strong> {results.Ixx.toFixed(2)} mm⁴
            </p>
            <p>
              <strong>Moment of Inertia (Iy):</strong> {results.Iyy.toFixed(2)} mm⁴
            </p>
            <p>
              <strong>Cross-Sectional Area (A):</strong> {results.area.toFixed(2)} mm²
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MomInertiaCalc;
