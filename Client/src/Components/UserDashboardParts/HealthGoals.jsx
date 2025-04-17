import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';

function HealthGoals() {
  const [goals, setGoals] = useState([
    { id: 1, name: "Daily Steps", unit: "steps", target: 10000, current: 7250, percent: 72 },
    { id: 2, name: "Water Intake", unit: "glasses", target: 8, current: 5, percent: 62 },
    { id: 3, name: "Sleep", unit: "hours", target: 8, current: 6.5, percent: 81 }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', unit: '', target: '', current: '' });

  useEffect(() => {
    if (showForm) {
      document.getElementById("goalName")?.focus();
    }
  }, [showForm]);

  // Function to open create goal form
  const handleCreateClick = () => {
    setIsEditing(false);
    setEditingGoal(null);
    setFormData({ name: '', unit: '', target: '', current: '' });
    setShowForm(true);
  };
  
  // Function to close form
  const handleCloseForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditingGoal(null);
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "current") {
      const targetValue = parseFloat(formData.target) || 100;
      const currentValue = parseFloat(value);
      const percent = Math.round(Math.min((currentValue / targetValue) * 100, 100));
      
      setFormData({ 
        ...formData, 
        [name]: value,
        percent: percent
      });
    } else {
      setFormData({ ...formData, [name]: value });
      
      // If target changed and we have a current value, recalculate the percent
      if (name === "target" && formData.current) {
        const targetValue = parseFloat(value) || 0;
        const currentValue = parseFloat(formData.current);
        if (targetValue > 0) {
          const percent = Math.round(Math.min((currentValue / targetValue) * 100, 100));
          setFormData(prev => ({ ...prev, percent: percent }));
        }
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const targetValue = parseFloat(formData.target);
    const currentValue = parseFloat(formData.current);
    if (isNaN(targetValue) || isNaN(currentValue) || targetValue <= 0) return;

    const percent = Math.min((currentValue / targetValue) * 100, 100);
    const newGoal = {
      name: formData.name,
      unit: formData.unit,
      target: targetValue,
      current: currentValue,
      percent: Math.round(percent)
    };

    if (isEditing && editingGoal) {
      // Update existing goal
      setGoals(goals.map(goal => 
        goal.id === editingGoal.id ? { ...newGoal, id: goal.id } : goal
      ));
    } else {
      // Add new goal with a unique ID
      const newId = goals.length > 0 ? Math.max(...goals.map(g => g.id)) + 1 : 1;
      setGoals([...goals, { ...newGoal, id: newId }]);
    }

    setFormData({ name: '', unit: '', target: '', current: '' });
    setShowForm(false);
    setIsEditing(false);
    setEditingGoal(null);
  };

  // Function to open the edit form for a goal
  const handleEditGoal = (goal) => {
    setIsEditing(true);
    setEditingGoal(goal);
    setFormData({
      name: goal.name,
      unit: goal.unit,
      target: goal.target.toString(),
      current: goal.current.toString(),
      percent: goal.percent
    });
    setShowForm(true);
  };

  // Function to delete a goal by filtering it out of the state
  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter((goal) => goal.id !== goalId));
  };

  // Function to update progress based on click position on progress bar
  const handleProgressBarClick = (e, goalId, goal) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const percentClicked = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    const newCurrentValue = (percentClicked / 100) * goal.target;
    
    setGoals(goals.map(g => {
      if (g.id === goalId) {
        return { 
          ...g, 
          current: parseFloat(newCurrentValue.toFixed(1)), 
          percent: Math.round(percentClicked) 
        };
      }
      return g;
    }));
  };

  // Function to update progress directly from the UI
  const handleProgressUpdate = (goalId, newValue) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const currentValue = parseFloat(newValue);
        const percent = Math.round(Math.min((currentValue / goal.target) * 100, 100));
        return { ...goal, current: currentValue, percent: percent };
      }
      return goal;
    }));
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
          {goals.length === 0 ? (
            <div className="flex justify-center items-center h-32 text-gray-500">
              No health goals set yet
            </div>
          ) : (
            goals.map((goal) => (
              <div key={goal.id} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{goal.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="whitespace-nowrap">{goal.current} / {goal.target} {goal.unit}</span>
                    <div className="flex items-center gap-1">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEditGoal(goal)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                      >
                        <Edit size={16} />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="text-rose-600 hover:text-rose-800 p-1 rounded-full hover:bg-rose-50"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 cursor-pointer relative"
                onClick={(e)=>handleProgressBarClick(e, goal.id, goal)}
                >
                  <motion.div
                    className="bg-gradient-to-r from-red-400 via-yellow-300 to-green-600 h-3 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${goal.percent}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-gray-500">{goal.percent}%</span>
                </div>
              </div>
            ))
          )}
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
            <h2 className="text-2xl text-blue-500 font-bold mb-6 text-center">
              {isEditing ? "Edit Health Goal" : "Create Health Goal"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <label className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500">Goal Name *</label>
                <input
                  id="goalName"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border-2 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div className="relative">
                <label className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500">Unit (e.g., steps, glasses) *</label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="w-full border-2 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div className="relative">
                <label className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500">Target Amount *</label>
                <input
                  type="number"
                  name="target"
                  value={formData.target}
                  min="0.1"
                  step="0.1"
                  onChange={handleInputChange}
                  className="w-full border-2 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div className="relative">
                <label className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500">Current Progress *</label>
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
                  <span className="font-bold text-gray-700 min-w-16 text-right">
                    {formData.current || 0}
                    {formData.percent ? ` (${formData.percent}%)` : ''}
                  </span>
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCloseForm}
                  className="px-4 py-2 shadow-md text-rose-600 border rounded-lg font-bold hover:bg-red-100 hover:text-rose-700 transition duration-300"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.95 }}
                  className="px-4 font-bold py-2 bg-gradient-to-br from-green-600 via-green-400 to-green-200 text-white rounded-lg hover:scale-105 hover:shadow-md transition duration-300 ease-in-out"
                >
                  {isEditing ? "Update" : "Save"}
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