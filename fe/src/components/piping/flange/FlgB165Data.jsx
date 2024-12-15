import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FlgData.css";
import Blind from "./images/BlindB165.png";
import Weldneck from "./images/WeldNeckB165.png";
import Socketwelding from "./images/SocketWeldingB165.png";
import Threaded from "./images/ThreadedB165.png";
import Slipon from "./images/SliponB165.png";
import Lapjoint from "./images/LapJointB165.png";
import Bolt from "./images/BoltB165.png";
import Ring from "./images/RingB165.png";

const flangeTypeImages = {
  Blind: Blind,
  "Weld Neck": Weldneck,
  "Socket Weld": Socketwelding,
  Threaded: Threaded,
  "Slip On": Slipon,
  "Lap Joint": Lapjoint,
};

const FlgB165Data = ({ title, description }) => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [pclOptions, setPclOptions] = useState([]);
  const [npsOptions, setNpsOptions] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedPcl, setSelectedPcl] = useState("");
  const [selectedNps, setSelectedNps] = useState("");

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
      : `${wholeNumber} ${fractionString || `${fraction.toFixed(3)} (not in map)`}`;
  };

  useEffect(() => {
    // Use the fixed API endpoint
    const apiUrl = "/api/flange/flangeb165/";

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        setProjects(data);
        setFilteredProjects(data);

        const types = [...new Set(data.map((item) => item.Type))];
        setTypeOptions(types);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (selectedType) {
      filtered = filtered.filter((project) => project.Type === selectedType);
      const pcl = [...new Set(filtered.map((project) => project.PCL))];
      setPclOptions(pcl);
    } else {
      setPclOptions([]);
    }

    if (selectedPcl) {
      filtered = filtered.filter((project) => project.PCL === selectedPcl);
      const nps = [...new Set(filtered.map((project) => project.NPS))];
      setNpsOptions(nps);
    } else {
      setNpsOptions([]);
    }

    if (selectedNps) {
      filtered = filtered.filter((project) => project.NPS === selectedNps);
    }

    setFilteredProjects(filtered);
  }, [selectedType, selectedPcl, selectedNps, projects]);

  return (
    <div className="container">
  <br />
  <div className="filters">
    <label className="dropdown-label">
      Flange Type:&ensp;
      <select
        value={selectedType}
        onChange={(e) => {
          setSelectedType(e.target.value);
          setSelectedPcl("");
          setSelectedNps("");
        }}
      >
        <option value="">Please select...</option>
        {typeOptions.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </label>
    <label className="dropdown-label">
      Pressure Class:&ensp;
      <select
        value={selectedPcl}
        onChange={(e) => {
          setSelectedPcl(e.target.value);
          setSelectedNps("");
        }}
        disabled={!selectedType}
      >
        <option value="">Please select...</option>
        {pclOptions.map((pcl) => (
          <option key={pcl} value={pcl}>
            {pcl}
          </option>
        ))}
      </select>
    </label>
    <label className="dropdown-label">
      NPS:&ensp;
      <select
        value={selectedNps}
        onChange={(e) => setSelectedNps(e.target.value)}
        disabled={!selectedPcl}
      >
        <option value="">Please select...</option>
        {npsOptions.map((nps) => (
          <option key={nps} value={nps}>
            {decimalToFraction(parseFloat(nps))}
          </option>
        ))}
      </select>
    </label>
  </div>

  {selectedType && selectedPcl && selectedNps && filteredProjects.length > 0 && (
    <div className="project-details">
      <hr />
      <h6>
        Flange: {selectedType} - {decimalToFraction(parseFloat(selectedNps))}" - {selectedPcl}#
      </h6>
      {filteredProjects.map((project) => (
        <div key={project.id} className="project">
          <table className="specs-table">
            <tbody>
                <tr>
                  {project.OD && (
                      <td><strong>OD:</strong> {project.OD}</td>
                  )}
                  {project.Thk && (
                      <td><strong>Thk:</strong> {project.Thk}</td>
                  )}
                  {project.X && (
                      <td><strong>X:</strong> {project.X}</td>
                  )}
                </tr>
                <tr>
                  {project.Y && (
                      <td><strong>Y:</strong> {project.Y}</td>
                  )}
                  {project.B && (
                      <td><strong>B:</strong> {project.B}</td>
                  )}
                  {project.B1 && (
                      <td><strong>B1:</strong> {project.B1}</td>
                  )}
                </tr>
                <tr>          
                  {project.D && (
                      <td><strong>D:</strong> {project.D}</td>
                  )}
                  {project.r && (
                      <td><strong>R:</strong> {project.r}</td>
                  )}
                  {project.T && (
                      <td><strong>T:</strong> {project.T}</td>
                  )}
                </tr>
                <tr>   
                  {project.Q && (
                      <td><strong>Q:</strong> {project.Q}</td>
                  )}
                  {project.Ah && (
                      <td><strong>Ah:</strong> {project.Ah}</td>
                  )}
                </tr> 

              </tbody>
              </table>
              <table>
              <tbody>
              <tr>
                <td colSpan="2" style={{ textAlign: "center", marginTop: "5px" }}>
                  <img
                    src={flangeTypeImages[selectedType]}
                    alt="Pipe illustration"
                    style={{
                      width: "100%",
                      borderRadius: "15px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </td>
              </tr>
              </tbody>
              </table>
              <table className="specs-table">
              <tbody>      

                <tr>   
                  {project.Faceod && (
                      <td><strong>FOD:</strong> {project.Faceod} mm</td>
                  )}              
                  {project.BCD && (
                      <td><strong>BCD:</strong> {project.BCD} mm</td>
                  )}
                  {project.BHD && (
                      <td><strong>BHD:</strong> {project.BHD} in</td>
                  )}
                </tr>
                <tr> 
                  {project.Bno && (
                      <td><strong>No.B:</strong> {project.Bno}</td>
                  )}
                  {project.Bsize && (
                      <td><strong>B.Size:</strong> {project.Bsize} in</td>
                  )}
                </tr>
                <tr>
                  {project.L1 && (
                      <td><strong>L1:</strong> {project.L1} mm</td>
                  )}
                  {project.L2 && (
                      <td><strong>L2:</strong> {project.L2} mm</td>
                  )}
                  {project.L3 && (
                      <td><strong>L3:</strong> {project.L3} mm</td>
                  )}
                </tr>
              
                </tbody>
              </table>
              <table>
              <tbody>
              <tr>
                <td colSpan="2" style={{ textAlign: "center", marginTop: "20px" }}>
                  <img
                    src={Bolt}
                    alt="Pipe illustration"
                    style={{
                      width: "100%",
                      borderRadius: "15px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </td>
              </tr>
              </tbody>
              </table>
              <table className="specs-table">
              <tbody>

                <tr>
                  {project.P && (
                      <td><strong>P:</strong> {project.P} mm</td>
                  )}
                  {project.E && (
                      <td><strong>E:</strong> {project.E} mm</td>
                  )}
                  {project.F && (
                      <td><strong>F:</strong> {project.F} mm</td>
                  )}
                </tr>
                <tr>
                  {project.Rr && (
                      <td><strong>r:</strong> {project.Rr} mm</td>
                  )}
                  {project.K && (
                      <td><strong>Kmin:</strong> {project.K} mm</td>
                  )}
                  {project.dD && (
                      <td><strong>Dis.:</strong> {project.dD} mm</td>
                  )}
                </tr>
              
                </tbody>
              </table>
              <table>
              <tbody>
              <tr>
                <td colSpan="2" style={{ textAlign: "center", marginTop: "20px" }}>
                  <img
                    src={Ring}
                    alt="Pipe illustration"
                    style={{
                      width: "100%",
                      borderRadius: "15px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
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

export default FlgB165Data;
