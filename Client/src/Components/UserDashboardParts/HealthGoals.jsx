import React, { useState } from 'react';

function HealthGoals() {
  const [goals, setGoals] = useState([
    { name: "Daily Steps", target: "10,000", current: "7,250", percent: 72 },
    { name: "Water Intake", target: "8 glasses", current: "5 glasses", percent: 62 },
    { name: "Sleep", target: "8 hours", current: "6.5 hours", percent: 81 }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    target: '',
    current: ''
  });

  const handleCreateClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const percent = Math.min(
      (parseFloat(formData.current) / parseFloat(formData.target)) * 100,
      100
    );
    setGoals([...goals, {
      name: formData.name,
      target: formData.target,
      current: formData.current,
      percent: Math.round(percent)
    }]);
    setFormData({ name: '', target: '', current: '' });
    setShowForm(false);
  };

  return (
    <>
      <div className="bg-white border rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b flex justify-between items-center">
          <span className="font-bold text-xl text-gray-800">
            Health Goals
          </span>
          <button
            className="text-blue-500 font-medium hover:text-blue-800"
            onClick={handleCreateClick}
          >
            +Create
          </button>
        </div>

        <div className="p-4 space-y-4 h-[270px] overflow-y-auto">
          {goals.map((goal) => (
            <div key={goal.name} className="mb-4">
              <div className="flex justify-between mb-1">
                <span>{goal.name}</span>
                <span>{goal.current} / {goal.target}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${goal.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-10 flex flex-col justify-center items-center p-6 overflow-auto">
          <div className="w-full max-w-xl border-2 p-4 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Create Health Goal</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">Goal Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Target</label>
                <input
                  type="text"
                  name="target"
                  value={formData.target}
                  onChange={handleInputChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Current</label>
                <input
                  type="text"
                  name="current"
                  value={formData.current}
                  onChange={handleInputChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default HealthGoals;
