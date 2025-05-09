import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftFromLine } from 'lucide-react';

function EmergencyPage() {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emergencyRequested, setEmergencyRequested] = useState(false);
  const [emergencyType, setEmergencyType] = useState("medical");

  const handleGoBack = () => {
    window.history.back();
  };

  // Get current location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setIsLoading(false);
        },
        (error) => {
          setLocationError(`Unable to retrieve your location: ${error.message}`);
          setIsLoading(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
    }
  }, []);

  const handleEmergencyTypeChange = (event) => {
    setEmergencyType(event.target.value);
  };

  const handleEmergencyRequest = () => {
    setIsLoading(true);

    // Simulate API call to emergency services
    setTimeout(() => {
      setEmergencyRequested(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-red-50">
      {/* Header */}
      <header className="bg-red-600 text-white py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/home" className="font-bold text-2xl">
            MediCheck<span className="text-white font-normal">Emergency</span>
          </Link>
          <button
            type="button"
            aria-label="Go back to previous page"
            onClick={handleGoBack}
            className="px-4 py-2 rounded-2xl hover:text-white text-red-600 bg-white hover:bg-red-600 border-2 border-red-600 hover:border-white flex items-center gap-2"
            aria-describedby="go-back-tooltip"
          >
            <ArrowLeftFromLine size={16} />
            <span className="hidden sm:inline">Go Back</span>
          </button>
        </div>
      </header>

      <main className="w-full mx-auto py-8 px-6 sm:px-6">
        {/* Emergency status alert */}
        {emergencyRequested ? (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8 rounded shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <div className="py-1 mb-2 sm:mb-0">
                <svg className="w-8 h-8 mr-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Emergency services have been notified</p>
                <p className="text-sm">Help is on the way. Please stay on this page for updates.</p>
                <p className="mt-2">
                  <strong>Your location:</strong> {location?.latitude.toFixed(6)}, {location?.longitude.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Page title */}
            <h1 className="text-3xl font-bold text-red-700 text-center mb-8">Emergency Assistance</h1>

            {/* Information panel */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">How This Works</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Share your current location</li>
                <li>Select the type of emergency</li>
                <li>Request emergency services</li>
                <li>Stay on this page until help arrives</li>
              </ol>
              <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800">
                <p className="font-bold">Important:</p>
                <p>If you are experiencing a life-threatening emergency, call your local emergency number immediately (e.g., 112 in India).</p>
              </div>
            </div>

            {/* Location status */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Your Location</h2>
              {isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                  <span className="ml-2">Getting your location...</span>
                </div>
              ) : locationError ? (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p>{locationError}</p>
                  <p className="mt-2">Please enable location services in your browser settings or enter your location manually.</p>
                </div>
              ) : location ? (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p><strong>Latitude:</strong> {location.latitude.toFixed(6)}</p>
                  <p><strong>Longitude:</strong> {location.longitude.toFixed(6)}</p>
                  <p className="text-sm text-gray-600 mt-2">This location will be shared with emergency services.</p>
                </div>
              ) : null}
            </div>

            {/* Emergency type selection */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Emergency Type</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <label className={`border-2 rounded-lg p-4 flex flex-col items-center cursor-pointer transition ${emergencyType === 'medical' ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="emergencyType"
                    value="medical"
                    checked={emergencyType === 'medical'}
                    onChange={handleEmergencyTypeChange}
                    className="sr-only"
                  />
                  <svg className="w-12 h-12 text-red-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="font-medium">Medical Emergency</span>
                </label>

                <label className={`border-2 rounded-lg p-4 flex flex-col items-center cursor-pointer transition ${emergencyType === 'fire' ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="emergencyType"
                    value="fire"
                    checked={emergencyType === 'fire'}
                    onChange={handleEmergencyTypeChange}
                    className="sr-only"
                  />
                  <svg className="w-12 h-12 text-red-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                  </svg>
                  <span className="font-medium">Fire Emergency</span>
                </label>

                <label className={`border-2 rounded-lg p-4 flex flex-col items-center cursor-pointer transition ${emergencyType === 'police' ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="emergencyType"
                    value="police"
                    checked={emergencyType === 'police'}
                    onChange={handleEmergencyTypeChange}
                    className="sr-only"
                  />
                  <svg className="w-12 h-12 text-red-600 mb-2 text-bold" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4 21V19.5C4 16.4624 6.46243 14 9.5 14H14.5C17.5376 14 20 16.4624 20 19.5V21M8 21V18.5M16 21V18.3333M8.5 6.5C10.514 8.22631 13.486 8.22631 15.5 6.5M16 7V4.92755L17.4657 2.78205C17.6925 2.45018 17.4548 2 17.0529 2H6.94712C6.5452 2 6.30755 2.45018 6.53427 2.78205L8 4.92755V7M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8V5.5H16V8Z" stroke="#ff0000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4"></path></g></svg>
                  <span className="font-medium">Police Assistance</span>
                </label>
              </div>
            </div>

            {/* Additional details */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Additional Details (Optional)</h2>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                rows="3"
                placeholder="Lorem ipsum dolor sit amet, consdidunt ut labore et dolgna aliqua ....."
              ></textarea>
            </div>

            {/* Request Button */}
            <div className="text-center mb-8">
              <button
                onClick={handleEmergencyRequest}
                disabled={!location || isLoading}
                className={`px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-bold text-white rounded-xl shadow-lg transition ${!location || isLoading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
                  }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                    Processing...
                  </span>
                ) : (
                  "Request Emergency Assistance"
                )}
              </button>
              {!location && !locationError && (
                <p className="mt-2 text-sm text-gray-600">Waiting for your location...</p>
              )}
            </div>
          </>
        )}

        {/* Emergency contacts */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Emergency Contacts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-bold text-red-600">National Emergency Number</div>
              <div className="text-xl font-bold">112</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-bold text-red-600">Women Helpline</div>
              <div className="text-xl font-bold">1098</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-bold text-red-600">Ambulance Service</div>
              <div className="text-xl font-bold">108</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-bold text-red-600">Fire Department</div>
              <div className="text-xl font-bold">101</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-bold text-red-600">Police Emergency</div>
              <div className="text-xl font-bold">100</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-bold text-red-600">MediCheck Support</div>
              <div className="text-xl font-bold">1800-123-4567</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 px-6 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p>© {new Date().getFullYear()} MediCheck. All rights reserved.</p>
          <p className="text-sm mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <Link to="/" className="text-red-300 hover:text-white ml-1">Return to main site</Link>.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default EmergencyPage;