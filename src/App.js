import React, { useState } from 'react';
import UserInputForm from './components/UserInputForm';
import PurificationOutput from './components/PurificationOutput';
import './index.css'; // Import compiled Tailwind CSS

function App() {
  const [purificationInstructions, setPurificationInstructions] = useState([]);

  const calculatePurification = (data) => {
    const { wastewaterSource, initialTDS, initialPH, targetUse } = data;
    let instructions = [];

    // Simulate Filtration: Reduces TDS by 50% and brings pH towards 7.0
    const postFilterTDS = initialTDS * 0.5;
    const postFilterPH = initialPH > 7.0 ? initialPH - ((initialPH - 7.0) * 0.5) : initialPH + ((7.0 - initialPH) * 0.5);

    // Determine Target Standards
    let targetTDS = 0;
    let targetTurbidity = 0;
    let targetBacteria = 0;

    if (targetUse === 'Plant Irrigation') {
      targetTDS = 150; // TDS must be > 150 ppm
      targetTurbidity = 15; // Turbidity must be < 15 NTU (simulated)
    } else if (targetUse === 'Drinking Water') {
      targetTDS = 500; // TDS must be < 500 ppm
      targetBacteria = 1; // Bacteria must be < 1 CFU/100mL (simulated)
    }

    instructions.push("A. Use Multi-Media Filter.");

    if (targetUse === 'Plant Irrigation') {
      if (postFilterTDS > targetTDS) {
        instructions.push("B. Water is ready for plant use. 🪴");
      } else {
        instructions.push("B. Post-filter TDS is too low for optimal plant growth. Consider adding nutrients. 🧪");
      }
    } else if (targetUse === 'Drinking Water') {
      if (postFilterTDS < targetTDS) {
        instructions.push("B. Post-filter TDS is acceptable for drinking water. 💧");
        instructions.push("C. Final Step: Boil for 5 minutes or use UV-C Disinfection. 🔬");
      } else {
        instructions.push("B. Filter again or consider Reverse Osmosis. 🔄");
        instructions.push("C. Final Step: Boil for 5 minutes or use UV-C Disinfection. 🔬");
      }
    }

    setPurificationInstructions(instructions);
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">H2O+ Purification App</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <UserInputForm onSubmit={calculatePurification} />
        <PurificationOutput instructions={purificationInstructions} />
      </div>
    </div>
  );
}

export default App;
