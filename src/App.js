import React, { useState } from 'react';
import UserInputForm from './components/UserInputForm';
import PurificationOutput from './components/PurificationOutput';
import './index.css'; // Import compiled Tailwind CSS

function App() {
  const [result, setResult] = useState(null);

  const calculatePurification = (data) => {
    const { initialTDS, initialPH, targetUse } = data;
    let instructions = [];
    let isSafe = false;
    let consumableStatus = 'Not Consumable';
    let contaminationStatus = 'Contaminated';
    let turbidityStatus = '';

    // Simulate Filtration: Reduces TDS by 50% and brings pH towards 7.0
    const postFilterTDS = initialTDS * 0.5;
    const postFilterPH = initialPH > 7.0 ? initialPH - ((initialPH - 7.0) * 0.5) : initialPH + ((7.0 - initialPH) * 0.5);

    // Simulate Turbidity: Assume initial turbidity is related to TDS, and filtration reduces it.
    const initialTurbidity = initialTDS / 10; // Simplified assumption
    const postFilterTurbidity = initialTurbidity * 0.2; // Filtration reduces turbidity significantly

    // Determine Target Standards
    let targetTDS = 0;
    let targetTurbidity = 0;
    // let targetBacteria = 0; // This was unused, let's focus on TDS and Turbidity

    if (targetUse === 'Plant Irrigation') {
      targetTDS = 150; // TDS must be > 150 ppm for nutrients
      targetTurbidity = 15; // Turbidity must be < 15 NTU
    } else if (targetUse === 'Drinking Water') {
      targetTDS = 500; // TDS must be < 500 ppm
      targetTurbidity = 5; // Turbidity must be < 5 NTU for drinking
    }

    instructions.push("A. Use Multi-Media Filter.");
    turbidityStatus = `Turbidity Sensor: ${postFilterTurbidity.toFixed(2)} NTU (Target: < ${targetTurbidity} NTU)`;


    if (targetUse === 'Plant Irrigation') {
      if (postFilterTDS > targetTDS && postFilterTurbidity < targetTurbidity) {
        instructions.push("B. Water is ready for plant use. 🪴");
        isSafe = true;
        consumableStatus = 'Consumable for Plants';
        contaminationStatus = 'Not Contaminated';
      } else {
        if (postFilterTDS <= targetTDS) {
          instructions.push("B. Post-filter TDS is too low for optimal plant growth. Consider adding nutrients. 🧪");
        }
        if (postFilterTurbidity >= targetTurbidity) {
          instructions.push("C. High turbidity. Additional filtration needed.");
        }
        isSafe = false;
      }
    } else if (targetUse === 'Drinking Water') {
      if (postFilterTDS < targetTDS && postFilterTurbidity < targetTurbidity) {
        instructions.push("B. Post-filter TDS and Turbidity are acceptable. 💧");
        instructions.push("C. Final Step: Boil for 5 minutes or use UV-C Disinfection to remove bacteria. 🔬");
        isSafe = true;
        consumableStatus = 'Consumable';
        contaminationStatus = 'Not Contaminated (after disinfection)';
      } else {
        if (postFilterTDS >= targetTDS) {
          instructions.push("B. High TDS. Filter again or consider Reverse Osmosis. 🔄");
        }
        if (postFilterTurbidity >= targetTurbidity) {
          instructions.push("C. High turbidity. Additional filtration needed.");
        }
        instructions.push("D. Final Step: Boil for 5 minutes or use UV-C Disinfection. 🔬");
        isSafe = false;
      }
    }

    setResult({
      isSafe,
      consumableStatus,
      contaminationStatus,
      turbidityStatus,
      instructions,
      postFilterPH,
    });
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">H2O+ Purification App</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <UserInputForm onSubmit={calculatePurification} />
        <PurificationOutput result={result} />
      </div>
    </div>
  );
}

export default App;
