import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";

function HealthGoals() {
  const API_URL = import.meta.env.VITE_API_URL;
  const tokenData = localStorage.getItem("authToken");
  const { value } = JSON.parse(tokenData);
  const token = value;

  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    unit: "",
    target: "",
    current: "",
    percent: 0,
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await fetch(`${API_URL}/goals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setGoals(data);
    } catch (err) {
      console.error("Failed to fetch goals:", err);
    }
  };

  const handleCreateClick = () => {
    setIsEditing(false);
    setEditingGoal(null);
    setFormData({ name: "", unit: "", target: "", current: "", percent: 0 });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditingGoal(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedForm = { ...formData, [name]: value };

    if (name === "current" || name === "target") {
      const currentValue =
        name === "current" ? parseFloat(value) : parseFloat(formData.current);
      const targetValue =
        name === "target" ? parseFloat(value) : parseFloat(formData.target);

      if (!isNaN(currentValue) && !isNaN(targetValue) && targetValue > 0) {
        updatedForm.percent = Math.round(
          Math.min((currentValue / targetValue) * 100, 100)
        );
      }
    }

    setFormData(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const targetValue = parseFloat(formData.target);
    const currentValue = parseFloat(formData.current);

    if (isNaN(targetValue) || isNaN(currentValue) || targetValue <= 0) return;

    const percent = Math.round(Math.min((currentValue / targetValue) * 100, 100));

    const newGoal = {
      name: formData.name,
      unit: formData.unit,
      target: targetValue,
      current: currentValue,
      percent,
    };

    try {
      const endpoint = isEditing ? `${API_URL}/goals/${editingGoal._id}` : `${API_URL}/goals`;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newGoal),
      });

      if (res.ok) {
        await fetchGoals();
        setShowForm(false);
        setFormData({ name: "", unit: "", target: "", current: "", percent: 0 });
        setIsEditing(false);
        setEditingGoal(null);
      } else {
        console.error("Failed to save goal");
      }
    } catch (err) {
      console.error("Error saving goal:", err);
    }
  };

  const handleEditGoal = (goal) => {
    setIsEditing(true);
    setEditingGoal(goal);
    setFormData({
      name: goal.name,
      unit: goal.unit,
      target: goal.target,
      current: goal.current,
      percent: goal.percent,
    });
    setShowForm(true);
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      const res = await fetch(`${API_URL}/goals/${goalId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setGoals(goals.filter((goal) => goal._id !== goalId));
      } else {
        console.error("Failed to delete goal");
      }
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };

  const handleProgressBarClick = (e, goal) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentClicked = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    const newCurrentValue = (percentClicked / 100) * goal.target;

    updateGoalProgress(goal._id, newCurrentValue);
  };

  const updateGoalProgress = async (goalId, newCurrent) => {
    const goal = goals.find((g) => g._id === goalId);
    const percent = Math.round(Math.min((newCurrent / goal.target) * 100, 100));

    try {
      const res = await fetch(`${API_URL}/goals/${goalId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...goal, current: newCurrent, percent }),
      });

      if (res.ok) {
        await fetchGoals();
      } else {
        console.error("Failed to update progress");
      }
    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  return (
    <>
      <div className="bg-white border rounded-lg shadow-lg mb-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl md:text-2xl text-gray-800">
            Health Goals
          </h1>
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
              <div key={goal._id} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{goal.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="whitespace-nowrap">
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
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
                        onClick={() => handleDeleteGoal(goal._id)}
                        className="text-rose-600 hover:text-rose-800 p-1 rounded-full hover:bg-rose-50"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </div>
                </div>
                <div
                  className="w-full bg-gray-200 rounded-full h-3 cursor-pointer relative"
                  onClick={(e) => handleProgressBarClick(e, goal)}
                >
                  <motion.div
                    className="bg-gradient-to-r from-red-400 via-yellow-300 to-green-600 h-3 rounded-full"
                    initial={{ width: "0%" }}
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
                <label className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500">
                  Goal Name *
                </label>
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
                <label className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500">
                  Unit (e.g., steps, glasses) *
                </label>
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
                <label className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500">
                  Target Amount *
                </label>
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
                <label className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500">
                  Current Progress *
                </label>
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
                    {formData.percent ? ` (${formData.percent}%)` : ""}
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
                  className="px-4 py-2 shadow-md text-white bg-blue-500 border border-blue-600 rounded-lg font-bold hover:bg-blue-600 transition duration-300"
                >
                  {isEditing ? "Update Goal" : "Save Goal"}
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
