import React, { useState, useEffect } from 'react';

const unitOptions = {
  length: [
    { name: 'Meters (m)', factor: 1 },
    { name: 'Kilometers (km)', factor: 1000 },
    { name: 'Centimeters (cm)', factor: 0.01 },
    { name: 'Millimeters (mm)', factor: 0.001 },
    { name: 'Inches (in)', factor: 0.0254 },
    { name: 'Feet (ft)', factor: 0.3048 },
    { name: 'Miles', factor: 1609.34 },
    { name: 'Nautical Miles', factor: 1852 },
    { name: 'Yards (yd)', factor: 0.9144 },
  ],
  angel: [
    { name: 'Degree', factor: 1},
    { name: 'Radian', factor: 57.2958 },
    { name: 'Gradian', factor: 0.9 },
  ],
  force: [
    { name: 'Newtons (N)', factor: 1 },
    { name: 'Kilo-Newtons (kN)', factor: 1000 },
    { name: 'Pounds-force (lbf)', factor: 4.448221615 },
    { name: 'kips', factor: 4448.222 },
    { name: 'Kilograms-force (kgf)', factor: 9.806650 },
    { name: 'Dynes (dyn)', factor: 0.00001 },
  ],
  mass: [
    { name: 'Grams (g)', factor: 1 },
    { name: 'Kilograms (kg)', factor: 1000 },
    { name: 'Pounds (lbs)', factor: 453.592370 },
    { name: 'Ounces (oz)', factor: 28.34952313 },
    { name: 'Tons (t)', factor: 1e6 },
  ],
  pressure: [
    { name: 'Pascals (Pa)', factor: 1 },
    { name: 'Mega-Pascals (MPa)', factor: 1e6 },
    { name: 'Bar', factor: 100000 },
    { name: 'Atmospheres (atm)', factor: 101325 },
    { name: 'psi', factor: 6894.76 },
  ],
  temperature: [
    { name: 'Celsius', factor: 1, offset: 0 },
    { name: 'Fahrenheit', factor: 1, offset: 32, convertToCelsius: (f) => (f - 32) * 5 / 9 },
    { name: 'Kelvin', factor: 1, offset: -273.15 },
  ],
  power: [
    { name: 'Watts (w)', factor: 1 },
    { name: 'Kilowatts (kw)', factor: 1000 },
    { name: 'Horsepower (hp)', factor: 735.49875 },
  ],
  energy: [
    { name: 'Joule (J)', factor: 1 },
    { name: 'Kilowatts-hour (kwh)', factor: 3600000 },
    { name: 'Kilocalorie', factor: 4184 },
  ],
  area: [
    { name: 'Square Meters', factor: 1 },
    { name: 'Square Kilometers', factor: 1e6 },
    { name: 'Square Feet', factor: 0.09290304 },
    { name: 'Acres', factor: 4046.856422 },
    { name: 'Hectares', factor: 10000 },
    { name: 'Square Inches', factor: 0.00064516 },
    { name: 'Square Miles', factor: 2590000 },
  ],
  volume: [
    { name: 'Cubic Meters', factor: 1 },
    { name: 'Liters', factor: 0.001 },
    { name: 'Cubic Feet', factor: 0.0283168 },
    { name: 'Cubic Inches', factor: 1.6387e-51 },
    { name: 'Gallons', factor: 0.00378541 },
  ],
  torque: [
    { name: 'Newton-meters', factor: 1 },
    { name: 'Foot-pounds', factor: 1.35582 },
  ],
  velocity: [
    { name: 'Meters per second (m/s)', factor: 1 },
    { name: 'Kilometers per hour (km/h)', factor: 0.277778 },
    { name: 'Miles per hour (mph)', factor: 0.44704 },
  ],
  density: [
    { name: 'Kilograms/cubic meter', factor: 1 },
    { name: 'Pounds/cubic inch', factor: 27679.904 },
    { name: 'Pounds/cubic feet', factor: 16.018463 },
  ],
};

const formatValue = (value) => {
  if (value === '') return '';
  const formattedValue = parseFloat(value).toFixed(8); // Format to 8 decimals
  return parseFloat(formattedValue).toString(); // Convert to string and remove trailing zeros
};

const Converter = () => {
  const [category, setCategory] = useState('length');
  const [inputUnit, setInputUnit] = useState(unitOptions['length'][0]?.name || '');
  const [outputUnit, setOutputUnit] = useState(unitOptions['length'][1]?.name || '');
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) {
      import('./ConverterMobile.css'); // Mobile-specific CSS
    } else {
      import('./Converter.css'); // Default desktop CSS
    }
  }, []);

  // Temperature conversion logic
  const convertTemperature = (value, inputUnit, outputUnit) => {
    let inputTemp = parseFloat(value);
    let outputTemp;

    if (isNaN(inputTemp)) return ''; // Return empty if input is invalid (NaN)

    if (inputUnit === 'Celsius') {
      if (outputUnit === 'Fahrenheit') {
        outputTemp = (inputTemp * 9) / 5 + 32;
      } else if (outputUnit === 'Kelvin') {
        outputTemp = inputTemp + 273.15;
      } else {
        outputTemp = inputTemp;
      }
    } else if (inputUnit === 'Fahrenheit') {
      inputTemp = (inputTemp - 32) * (5 / 9); // Convert to Celsius first
      if (outputUnit === 'Celsius') {
        outputTemp = inputTemp;
      } else if (outputUnit === 'Kelvin') {
        outputTemp = inputTemp + 273.15;
      }
    } else if (inputUnit === 'Kelvin') {
      inputTemp = inputTemp - 273.15; // Convert to Celsius first
      if (outputUnit === 'Celsius') {
        outputTemp = inputTemp;
      } else if (outputUnit === 'Fahrenheit') {
        outputTemp = (inputTemp * 9) / 5 + 32;
      }
    }

    return formatValue(outputTemp);
  };

  // Recalculate output value whenever category, inputUnit, or outputUnit changes
  useEffect(() => {
    if (inputValue !== '') {
      if (category === 'temperature') {
        setOutputValue(convertTemperature(inputValue, inputUnit, outputUnit));
      } else {
        const inputFactor = unitOptions[category]?.find((u) => u.name === inputUnit)?.factor || 1;
        const outputFactor = unitOptions[category]?.find((u) => u.name === outputUnit)?.factor || 1;
        const convertedValue = (parseFloat(inputValue) * inputFactor) / outputFactor;
        setOutputValue(formatValue(convertedValue));
      }
    }
  }, [category, inputUnit, outputUnit, inputValue]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      if (category === 'temperature') {
        setOutputValue(convertTemperature(value, inputUnit, outputUnit));
      } else {
        const inputFactor = unitOptions[category]?.find((u) => u.name === inputUnit)?.factor || 1;
        const outputFactor = unitOptions[category]?.find((u) => u.name === outputUnit)?.factor || 1;
        const convertedValue = (parseFloat(value) * inputFactor) / outputFactor;
        setOutputValue(formatValue(convertedValue));
      }
    } else {
      setOutputValue('');
    }
  };

  return (
    <div className="converter-container">
      <div className="converter-inputs">
        {/* Category Dropdown */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {Object.keys(unitOptions).map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {/* Input Unit Dropdown */}
        <select value={inputUnit} onChange={(e) => setInputUnit(e.target.value)}>
          {unitOptions[category]?.map((unit) => (
            <option key={unit.name} value={unit.name}>
              {unit.name}
            </option>
          ))}
        </select>
        &nbsp;&nbsp;&nbsp;
        {/* Input Box */}
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter value"
        />

        <span className="converter-separator">to</span>

        {/* Output Unit Dropdown */}
        <select value={outputUnit} onChange={(e) => setOutputUnit(e.target.value)}>
          {unitOptions[category]?.map((unit) => (
            <option key={unit.name} value={unit.name}>
              {unit.name}
            </option>
          ))}
        </select>
        &nbsp;&nbsp;&nbsp;
        {/* Output Box */}
        <input type="text" value={outputValue} readOnly placeholder="Converted value" />
      </div>
    </div>
  );
};

export default Converter;