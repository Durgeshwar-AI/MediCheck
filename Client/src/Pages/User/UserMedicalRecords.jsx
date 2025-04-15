import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../Components/UserDashboardParts/Header';

const UserMedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.type.startsWith('image/'));

    if (validFiles.length !== files.length) {
      setUploadError('Only image files are allowed!');
    } else {
      setUploadError('');
    }

    const newRecords = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file)
    }));

    setRecords(prev => [...prev, ...newRecords]);
  };

  const handleRemove = (id) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
    <Header/>
      <motion.h2
        className="text-3xl font-bold text-center text-green-700 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Upload Medical Records
      </motion.h2>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-green-100 file:text-green-700
                     hover:file:bg-green-200"
        />
        {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Your Records</h3>
        {records.length === 0 ? (
          <p className="text-gray-500">No records uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {records.map(record => (
              <motion.div
                key={record.id}
                className="bg-white shadow-md rounded-lg p-4 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <img
                  src={record.url}
                  alt={record.name}
                  className="w-full h-48 object-cover rounded"
                />
                <p className="mt-2 text-sm font-medium text-gray-700">{record.name}</p>
                <button
                  onClick={() => handleRemove(record.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs hover:bg-red-600"
                >
                  ✕
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMedicalRecords;
