import React, { useState, useEffect, Suspense } from "react";
import Converter from "../main/Converter";

const Piping = () => {
  const [standards, setStandards] = useState([]);
  const [calculators, setCalculators] = useState([]);
  const [selectedPipe, setSelectedPipe] = useState(null);
  const [selectedCalculator, setSelectedCalculator] = useState(null);
  const [PipeComponent, setPipeComponent] = useState(null);
  const [CalculatorComponent, setCalculatorComponent] = useState(null);

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (isMobile) {
      import("./PipingMobile.css"); // Use mobile-specific CSS
    } else {
      import("./Piping.css"); // Use default desktop CSS
    }
  }, [isMobile]);

  // Fetch standards and calculators data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [standardsResponse, calculatorsResponse] = await Promise.all([
          fetch(`/api/stdpipe/?_=${Date.now()}`),
          fetch(`/api/calcpipe/?_=${Date.now()}`),
        ]);
        setStandards(await standardsResponse.json());
        setCalculators(await calculatorsResponse.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Load selected pipe component dynamically
  const loadPipeComponent = async (item) => {
    setSelectedPipe(item);
    try {
      const importedComponent = await import(`${item.Componlink}`);
      setPipeComponent(() => importedComponent.default);
    } catch (error) {
      console.error("Error loading pipe component:", error);
    }
  };

  // Load selected calculator component dynamically
  const loadCalculatorComponent = async (item) => {
    setSelectedCalculator(item);
    try {
      const importedComponent = await import(`${item.Componlinkc}`);
      setCalculatorComponent(() => importedComponent.default);
    } catch (error) {
      console.error("Error loading calculator component:", error);
    }
  };

  return (
    <div className="grid-container">
      {/* First row, first box: Standards dropdown */}
      <div className="grid-box">
        <select
          onChange={(e) => {
            const selectedItem = standards.find(
              (item) => item.id === parseInt(e.target.value, 10)
            );
            loadPipeComponent(selectedItem);
          }}
          defaultValue=""
        >
          <option value="" disabled>
            -- Select a Standard --
          </option>
          {standards.map((item) => (
            <option key={item.id} value={item.id}>
              {item.Title}: {item.Description}
            </option>
          ))}
        </select>
        {PipeComponent && selectedPipe ? (
          <Suspense fallback={<div>Loading standard component...</div>}>
            <PipeComponent />
          </Suspense>
        ) : (
          <div className="default-message">Please select a standard...</div>
        )}
      </div>

      {/* First row, second box: Calculators dropdown */}
      <div className="grid-box">
        <select
          onChange={(e) => {
            const selectedItem = calculators.find(
              (item) => item.id === parseInt(e.target.value, 10)
            );
            loadCalculatorComponent(selectedItem);
          }}
          defaultValue=""
        >
          <option value="" disabled>
            -- Select a Calculator --
          </option>
          {calculators.map((item) => (
            <option key={item.id} value={item.id}>
              {item.Titlec}: {item.Descriptionc}
            </option>
          ))}
        </select>
        {CalculatorComponent && selectedCalculator ? (
          <Suspense fallback={<div>Loading calculator component...</div>}>
            <CalculatorComponent
              title={selectedCalculator.Titlec}
              description={selectedCalculator.Descriptionc}
            />
          </Suspense>
        ) : (
          <div className="default-message">Please select a calculator...</div>
        )}
      </div>

      {/* Second row: Converter component */}
      <div className="grid-box">
        <Converter />
      </div>
    </div>
  );
};

export default Piping;
