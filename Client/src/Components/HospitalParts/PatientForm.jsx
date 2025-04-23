import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const PatientForm = ({ onSubmit, onCancel }) => {
  const URL = import.meta.env.VITE_API_URL;
  const tokenData = localStorage.getItem("authToken");
  const { value } = JSON.parse(tokenData);
  const token = value;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    admissionReason: "",
    medicalHistory: "",
    allergies: "",
    ongoingMedications: "",
    additionalRemarks: "",
    address: "",
    phone: "",
    email: "",
    insuranceNumber: "",
    emergencyContact: "",
    emergencyPhone: "",
    department: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = value.replace(/\D/g, "").slice(0, 10); // Restricts to 10 digits
    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/patient`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Patient registered:", response.data);
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        bloodGroup: "",
        admissionReason: "",
        medicalHistory: "",
        allergies: "",
        ongoingMedications: "",
        additionalRemarks: "",
        address: "",
        phone: "",
        email: "",
        insuranceNumber: "",
        emergencyContact: "",
        emergencyPhone: "",
        department: "",
        status: "",
      });
    } catch (error) {
      console.error("Error registering patient:", error);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="sticky top-0 z-10 pb-2 sm:pb-3 md:pb-4">
        <h2 className="text-xl sm:text-2xl text-center bg-transparent font-bold mb-1">
          Patient Registration Form
        </h2>
        <div className="w-36 sm:w-48 md:w-60 h-0.5 bg-blue-500 mx-auto mb-2 sm:mb-3 rounded-full"></div>
      </div>

      <div
        className="overflow-y-auto max-h-[400px] sm:max-h-[500px] md:max-h-[580px] pr-1 sm:pr-2"
        style={{ scrollbarWidth: "thin" }}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-3 sm:space-y-4 md:space-y-5"
        >
          {/* Personal Information Section */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  required
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>
          </div>

          {/* Medical Information Section */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">
              Medical Information
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Condition
                </label>
                <input
                  type="text"
                  name="admissionReason"
                  value={formData.admissionReason}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Ongoing Medications
                </label>
                <input
                  type="text"
                  name="ongoingMedications"
                  value={formData.ongoingMedications}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Medical History
                </label>
                <input
                  type="text"
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">
                    Allergies
                  </label>
                  <input
                    type="text"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Additional Remarks
                </label>
                <textarea
                  name="additionalRemarks"
                  value={formData.additionalRemarks}
                  onChange={handleChange}
                  rows="2"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">
              Contact Information
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  required
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    maxLength={10}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          {/*Emergency Contact Information Section */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">
              Emergency Contact Information
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">
                    Emergency Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handlePhoneChange}
                    maxLength={10}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">
                    Insurance Number
                  </label>
                  <input
                    type="text"
                    name="insuranceNumber"
                    value={formData.insuranceNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Department & Status Section */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">
              Department & Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="General Physician" className="bg-blue-100">
                    General Physician
                  </option>
                  <option value="ENT" className="bg-purple-100">
                    ENT
                  </option>
                  <option value="Cardiology" className="bg-red-100">
                    Cardiology
                  </option>
                  <option value="Dermatology" className="bg-green-100">
                    Dermatology
                  </option>
                  <option value="Gynecology" className="bg-pink-100">
                    Gynecology
                  </option>
                  <option value="Neurology" className="bg-yellow-100">
                    Neurology
                  </option>
                  <option value="Ophthalmology" className="bg-indigo-100">
                    Ophthalmology
                  </option>
                  <option value="Orthopedics" className="bg-orange-100">
                    Orthopedics
                  </option>
                  <option value="Pediatrics" className="bg-teal-100">
                    Pediatrics
                  </option>
                  <option value="Psychiatry" className="bg-cyan-100">
                    Psychiatry
                  </option>
                  <option value="Radiology" className="bg-amber-100">
                    Radiology
                  </option>
                  <option value="Pathology" className="bg-lime-100">
                    Pathology
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Stable">Stable</option>
                  <option value="Active">Active</option>
                  <option value="Recovering">Recovering</option>
                  <option value="Under Observation">Under Observation</option>
                  <option value="Critical">Critical</option>
                  <option value="Discharged">Discharged</option>
                </select>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white pt-2 sm:pt-3 pb-1 flex justify-end space-x-2 sm:space-x-3">
            <motion.button
              type="button"
              onClick={onCancel}
              className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register Patient
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default PatientForm;