import React from 'react';

function PurificationOutput({ instructions }) {
  if (instructions.length === 0) {
    return null;
  }

  const isSuccess = instructions.some(instruction => instruction.includes("Water is ready for plant use.") || instruction.includes("Post-filter TDS is acceptable for drinking water."));

  return (
    <div className={`mt-8 p-6 rounded-lg shadow-md ${isSuccess ? 'bg-green-100 border-green-400 text-green-800' : 'bg-blue-100 border-blue-400 text-blue-800'}`}>
      <h2 className="text-2xl font-bold mb-4">Purification Instructions:</h2>
      <ul className="list-disc list-inside space-y-2">
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
    </div>
  );
}

export default PurificationOutput;
