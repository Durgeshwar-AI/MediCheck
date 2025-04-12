import React, { useState, useEffect } from 'react';

const PatientList = ({ patients }) => {
  const [displayPatients, setDisplayPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const patientsPerPage = 7;

  useEffect(() => {
    if (patients && patients.length > 0) {
      let filtered = [...patients];
      
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(patient => 
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply status filter
      if (statusFilter !== 'all') {
        filtered = filtered.filter(patient => 
          patient.status.toLowerCase() === statusFilter.toLowerCase()
        );
      }
      
      setDisplayPatients(filtered);
    } else {
      setDisplayPatients([]);
    }
  }, [patients, searchTerm, statusFilter]);

  // Get current patients for pagination
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = displayPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(displayPatients.length / patientsPerPage);

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase().replace(/\s+/g, '')) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'stable':
        return 'bg-yellow-100 text-yellow-800';
      case 'recovering':
        return 'bg-blue-100 text-blue-800';
      case 'underobservation':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle pagination
  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md h-full">
      <h2 className="text-xl sm:text-2xl text-center font-bold mb-1">Recent Patients</h2>
      <div className="w-32 sm:w-40 h-0.5 bg-blue-500 mx-auto mb-4 sm:mb-7 rounded-full"></div>
      
      <div className="flex flex-col sm:flex-row justify-between mb-3 sm:mb-4 gap-2 sm:gap-3">
        <div className="w-full sm:w-auto md:w-64 mb-2 sm:mb-0">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="critical">Critical</option>
            <option value="stable">Stable</option>
            <option value="recovering">Recovering</option>
            <option value="underobservation">Under Observation</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto mt-4 sm:mt-7">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient Name
              </th>
              <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor
              </th>
              <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPatients.length > 0 ? (
              currentPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                    {patient.id}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                    {patient.name}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                    {patient.age}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                    {patient.doctor}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                    <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-2 sm:px-4 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-500">
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row justify-center sm:justify-end items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <span className="text-xs sm:text-sm text-gray-500">
            Showing {indexOfFirstPatient + 1} to {Math.min(indexOfLastPatient, displayPatients.length)} of {displayPatients.length} patients
          </span>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 rounded-md disabled:opacity-50"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-600 text-white rounded-md text-xs sm:text-sm">
              {currentPage}
            </div>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 rounded-md disabled:opacity-50"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList;