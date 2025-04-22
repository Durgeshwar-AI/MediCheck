import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil } from "lucide-react";

const PatientList = () => {
  const URL = import.meta.env.VITE_API_URL;
  const tokenData = localStorage.getItem("authToken");
  const { value } = JSON.parse(tokenData);
  const token = value;

  const [patients, setPatients] = useState([]);
  const [displayPatients, setDisplayPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patientsPerPage = 7;

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${URL}/patient`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    let filtered = [...patients];

    if (searchTerm) {
      filtered = filtered.filter(
        (patient) =>
          patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((patient) => {
        const normalizedPatientStatus = patient.status
          .toLowerCase()
          .replace(/\s+/g, "");
        const normalizedFilterStatus = statusFilter
          .toLowerCase()
          .replace(/\s+/g, "");
        return normalizedPatientStatus === normalizedFilterStatus;
      });
    }

    setDisplayPatients(filtered);
  }, [patients, searchTerm, statusFilter]);

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = displayPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );
  const totalPages = Math.ceil(displayPatients.length / patientsPerPage);

  const getStatusColor = (status) => {
    switch (status.toLowerCase().replace(/\s+/g, "")) {
      case "active":
        return "bg-green-100 text-green-800";
      case "critical":
        return "bg-red-100 text-red-800";
      case "stable":
        return "bg-yellow-100 text-yellow-800";
      case "recovering":
        return "bg-blue-100 text-blue-800";
      case "underobservation":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const handleEditSpecialty = (patientId) => {
    const patient = patients.find((p) => p._id === patientId);
    setSelectedPatient({ ...patient }); // shallow copy for editing
    setIsModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `${URL}/patient/${selectedPatient._id}`,
        {
          department: selectedPatient.department,
          status: selectedPatient.status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchPatients();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md h-full">
      <h2 className="text-2xl text-center font-bold mb-2">Recent Patients</h2>
      <div className="w-32 h-0.5 bg-blue-500 mx-auto mb-6 rounded-full"></div>

      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="critical">Critical</option>
          <option value="stable">Stable</option>
          <option value="recovering">Recovering</option>
          <option value="under observation">Under Observation</option>
          <option value="discharged">Discharged</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Patient Name",
                "Age",
                "Specialty",
                "Status",
                "Actions",
              ].map((col, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPatients.length > 0 ? (
              currentPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {patient.patientId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{`${patient.firstName} ${patient.lastName}`}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {patient.age}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {patient.department}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                        patient.status
                      )}`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEditSpecialty(patient._id)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      <Pencil size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-4 text-center text-sm text-gray-500"
                >
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <span>
            Showing {indexOfFirstPatient + 1} to{" "}
            {Math.min(indexOfLastPatient, displayPatients.length)} of{" "}
            {displayPatients.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-3 py-1 bg-blue-600 text-white rounded-md">
              {currentPage}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Patient</h3>

            <label className="block text-sm font-medium mb-1">Department</label>
            <select
              name="department"
              value={selectedPatient.department}
              onChange={(e) =>
                setSelectedPatient({
                  ...selectedPatient,
                  department: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
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

            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={selectedPatient.status}
              onChange={(e) =>
                setSelectedPatient({
                  ...selectedPatient,
                  status: e.target.value,
                })
              }
              className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            >
              <option value="Active">Active</option>
              <option value="Critical">Critical</option>
              <option value="Stable">Stable</option>
              <option value="Recovering">Recovering</option>
              <option value="Under Observation">Under Observation</option>
              <option value="Discharged">Discharged</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList;
