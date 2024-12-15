import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PipeData.css";
import pipeImage from "./images/Pipe.png";

const PipeB3619Data = ({ title, description }) => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [npsOptions, setNpsOptions] = useState([]);
  const [schOptions, setSchOptions] = useState([]);
  const [selectedNps, setSelectedNps] = useState("");
  const [selectedSch, setSelectedSch] = useState("");

  const decimalToFraction = (decimal) => {
    const fractionMap = {
      "0.125": "1/8",
      "0.250": "1/4",
      "0.375": "3/8",
      "0.500": "1/2",
      "0.625": "5/8",
      "0.750": "3/4",
      "0.875": "7/8",
    };

    const wholeNumber = Math.floor(decimal);
    const fraction = decimal - wholeNumber;

    if (fraction === 0) return wholeNumber.toString();

    const fractionString = fractionMap[fraction.toFixed(3)];

    return wholeNumber === 0
      ? fractionString || `${fraction.toFixed(3)} (not in map)`
      : `${wholeNumber} ${
          fractionString || `${fraction.toFixed(3)} (not in map)`
        }`;
  };

  useEffect(() => {
    const apiUrl = "/api/pipe/asmeb3619/";

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data.map((project) => ({
          ...project,
          NPS: parseFloat(project.NPS).toString(),
          Sch: project.Sch.toString(),
        }));
        setProjects(data);
        setFilteredProjects(data);

        const nps = [...new Set(data.map((project) => project.NPS))].sort(
          (a, b) => parseFloat(a) - parseFloat(b)
        );
        setNpsOptions(nps);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    let filtered = projects;
    if (selectedNps) {
      filtered = filtered.filter((project) => project.NPS === selectedNps);
      const sch = [...new Set(filtered.map((project) => project.Sch))].sort(
        (a, b) => parseFloat(a) - parseFloat(b)
      );
      setSchOptions(sch);
    } else {
      setSchOptions([]);
    }

    if (selectedSch) {
      filtered = filtered.filter((project) => project.Sch === selectedSch);
    }

    setFilteredProjects(filtered);
  }, [selectedNps, selectedSch, projects]);

  const getSelectedDn = () => {
    const project = projects.find(
      (p) => p.NPS === selectedNps && p.Sch === selectedSch
    );
    return project ? project.DN : "";
  };

  return (
    <div className="container">
      <br />
      <div className="filters">
        <label className="dropdown-label">
          NPS:&ensp;
          <select
            value={selectedNps}
            onChange={(e) => {
              setSelectedNps(e.target.value);
              setSelectedSch("");
            }}
          >
            <option value="">Please select...</option>
            {npsOptions.map((nps) => (
              <option key={nps} value={nps}>
                {decimalToFraction(parseFloat(nps))}
              </option>
            ))}
          </select>
        </label>
        <label className="dropdown-label">
          Sch:&ensp;
          <select
            value={selectedSch}
            onChange={(e) => setSelectedSch(e.target.value)}
            disabled={!selectedNps}
          >
            <option value="">Please select...</option>
            {schOptions.map((sch) => (
              <option key={sch} value={sch}>
                {sch}
              </option>
            ))}
          </select>
        </label>
      </div>
      {selectedNps && selectedSch && (
        <div className="project-details">
          <hr />
          <h6>
            Pipe Size: {decimalToFraction(parseFloat(selectedNps))}" (DN
            {getSelectedDn()}), Sch: {selectedSch}
          </h6>
          {filteredProjects.map((project) => (
            <div
              key={`${project.NPS}-${project.Sch}-${project.OD}`}
              className="project"
            >
              <table className="specs-table">
                <tbody>
                  <tr>
                    <td>
                      <strong>OD:</strong> {project.OD} mm
                    </td>
                    <td>
                      <strong>ID:</strong>{" "}
                      {(project.OD - project.Thk * 2).toFixed(2)} mm
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Thk:</strong> {project.Thk} mm
                    </td>
                    <td>
                      <strong>Weight:</strong> {project.Weight} kg/m
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <table>
                  <tbody>
                    <tr>
                      <td colSpan="2" style={{ textAlign: "center" }}>
                        <img
                          className="img-show"
                          src={pipeImage}
                          alt="Pipe illustration"
                          style={{ width: "100%" }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PipeB3619Data;
