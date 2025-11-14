import React, { useState } from 'react';

function UserInputForm({ onSubmit }) {
  const [wastewaterSource, setWastewaterSource] = useState('Laundry');
  const [initialTDS, setInitialTDS] = useState(300);
  const [initialPH, setInitialPH] = useState(7.0);
  const [targetUse, setTargetUse] = useState('Plant Irrigation');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      wastewaterSource,
      initialTDS: parseFloat(initialTDS),
      initialPH: parseFloat(initialPH),
      targetUse,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="wastewaterSource" className="block text-sm font-medium text-gray-700">Wastewater Source:</label>
        <select
          id="wastewaterSource"
          value={wastewaterSource}
          onChange={(e) => setWastewaterSource(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option>Laundry</option>
          <option>Kitchen</option>
          <option>Bath/Shower</option>
          <option>Custom</option>
        </select>
      </div>

      <div>
        <label htmlFor="initialTDS" className="block text-sm font-medium text-gray-700">Initial TDS (Total Dissolved Solids) (300 - 2000 ppm):</label>
        <input
          type="number"
          id="initialTDS"
          value={initialTDS}
          onChange={(e) => setInitialTDS(e.target.value)}
          min="300"
          max="2000"
          step="1"
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="initialPH" className="block text-sm font-medium text-gray-700">Initial pH (5.0 - 11.0):</label>
        <input
          type="number"
          id="initialPH"
          value={initialPH}
          onChange={(e) => setInitialPH(e.target.value)}
          min="5.0"
          max="11.0"
          step="0.1"
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Target Use:</span>
        <div className="flex items-center">
          <input
            id="plantIrrigation"
            name="targetUse"
            type="radio"
            value="Plant Irrigation"
            checked={targetUse === 'Plant Irrigation'}
            onChange={(e) => setTargetUse(e.target.value)}
            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
          />
          <label htmlFor="plantIrrigation" className="ml-2 block text-sm text-gray-900">Plant Irrigation</label>
        </div>
        <div className="flex items-center">
          <input
            id="drinkingWater"
            name="targetUse"
            type="radio"
            value="Drinking Water"
            checked={targetUse === 'Drinking Water'}
            onChange={(e) => setTargetUse(e.target.value)}
            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
          />
          <label htmlFor="drinkingWater" className="ml-2 block text-sm text-gray-900">Drinking Water</label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Get Purification Instructions
      </button>
    </form>
  );
}

export default UserInputForm;
