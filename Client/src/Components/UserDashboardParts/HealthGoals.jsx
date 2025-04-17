import React, { useState, useEffect } from 'react';
import { easeInOut, motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';

function HealthGoals() {
  const [goals, setGoals] = useState([
    { name: "Daily Steps", unit: "steps", target: 10000, current: 7250, percent: 72 },
    { name: "Water Intake", unit: "glasses", target: 8, current: 5, percent: 62 },
    { name: "Sleep", unit: "hours", target: 8, current: 6.5, percent: 81 }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', unit: '', target: '', current: '' });

  useEffect(() => {
    if (showForm) {
      document.getElementById("goalName")?.focus();
    }
  }, [showForm]);

  const handleCreateClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetValue = parseFloat(formData.target);
    const currentValue = parseFloat(formData.current);
    if (isNaN(targetValue) || isNaN(currentValue) || targetValue <= 0) return;

    const percent = Math.min((currentValue / targetValue) * 100, 100);
    setGoals([...goals, {
      name: formData.name,
      unit: formData.unit,
      target: targetValue,
      current: currentValue,
      percent: Math.round(percent)
    }]);

    setFormData({ name: '', unit: '', target: '', current: '' });
    setShowForm(false);
  };

  // Function to delete a goal by filtering it out of the state
  const handleDeleteGoal = (goalName) => {
    setGoals(goals.filter((goal) => goal.name !== goalName));
  };

  return (
    <>
      <div className="bg-white border rounded-lg shadow-lg mb-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl md:text-2xl text-gray-800">Health Goals</h1>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="hover:text-white font-semibold px-2 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-500 hover:shadow-lg transition duration-300 border-2 hover:border-gray-50 hover:scale-105 bg-white border-blue-500 text-blue-500"
            onClick={handleCreateClick}
          >
            <Plus /> Create
          </motion.button>
        </div>
<hr className="my-4" />
        <div className="mt-4 space-y-4 h-[270px] overflow-y-auto">
          {goals.map((goal) => (
            <div key={goal.name} className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{goal.name}</span>
                <div className="flex items-center gap-2">
                  <span>{goal.current} / {goal.target} {goal.unit}</span>
                  <motion.button
                    whileTap={{
                      scale: 0.95,
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: 2,
                      ease: easeInOut
                    }}
                    onClick={() => handleDeleteGoal(goal.name)}
                    className="text-rose-600 hover:text-rose-800 transition rounded-2xl border-2 border-red-500 shadow-md"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-red-400 via-yellow-300 to-green-600 h-3 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${goal.percent}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-transparent bg-opacity-50 backdrop-blur-md flex justify-center items-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-xl bg-white border-2 p-6 rounded-lg shadow-lg border-blue-500"
          >
            <h2 className="text-2xl text-blue-500 font-bold mb-6 text-center">Create Health Goals</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">Goal Name</label>
                <input
                  id="goalName"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit (e.g., steps, glasses)</label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="mt-1 w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Target</label>
                <input
                  type="number"
                  name="target"
                  value={formData.target}
                  onChange={handleInputChange}
                  className="mt-1 w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Current</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    name="current"
                    min="0"
                    max={formData.target || 100}
                    value={formData.current}
                    onChange={handleInputChange}
                    className="w-full cursor-pointer accent-blue-500"
                    required
                  />
                  <span className="font-bold text-gray-700">{formData.current}</span>
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCloseForm}
                  className="px-4 py-2 shadow-md text-rose-600 border rounded-lg font-bold hover:bg-red-300 hover:text-white transition duration-300"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-4 font-bold py-2 bg-gradient-to-br from-green-600 via-green-400 to-green-200 text-white rounded-lg hover:scale-105 hover:shadow-md transition duration-300 ease-in-out"
                >
                  Save
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default HealthGoals;