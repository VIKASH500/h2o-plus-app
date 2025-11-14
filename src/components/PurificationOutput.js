import React from 'react';

function PurificationOutput({ result }) {
  if (!result) {
    return null;
  }

  const { isSafe, consumableStatus, contaminationStatus, turbidityStatus, instructions } = result;

  return (
    <div className={`mt-8 p-6 rounded-lg shadow-md border ${isSafe ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'}`}>
      <div className="flex items-center mb-4">
        <span className={`text-4xl mr-4 ${isSafe ? 'text-green-600' : 'text-red-600'}`}>
          {isSafe ? '✅' : '❌'}
        </span>
        <h2 className={`text-2xl font-bold ${isSafe ? 'text-green-800' : 'text-red-800'}`}>
          {isSafe ? 'Water is Safe' : 'Water is Not Safe'}
        </h2>
      </div>

      <div className="space-y-2 text-sm mb-4">
        <p><strong>Status:</strong> {consumableStatus}</p>
        <p><strong>Contamination:</strong> {contaminationStatus}</p>
        <p><strong>Turbidity:</strong> {turbidityStatus}</p>
        <p><strong>Post-Filter pH:</strong> {result.postFilterPH ? result.postFilterPH.toFixed(2) : 'N/A'}</p>
      </div>

      <h3 className="text-lg font-bold mb-2">Purification Instructions:</h3>
      <ul className="list-disc list-inside space-y-2">
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
    </div>
  );
}

export default PurificationOutput;
