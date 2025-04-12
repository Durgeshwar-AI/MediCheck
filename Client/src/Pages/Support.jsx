import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function EmergencyPage() {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emergencyRequested, setEmergencyRequested] = useState(false);
  const [emergencyType, setEmergencyType] = useState("medical");

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
          <Link to="/home" className="text-white hover:text-red-100 transition">
            Return to Main Site
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-6">
        {/* Emergency status alert */}
        {emergencyRequested ? (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8 rounded shadow-md">
            <div className="flex items-center">
              <div className="py-1">
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
                <p>If you are experiencing a life-threatening emergency, call your local emergency number immediately (e.g., 911 in the US).</p>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <svg className="w-12 h-12 text-red-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
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
                placeholder="Describe your emergency or any additional information that might help emergency responders..."
              ></textarea>
            </div>

            {/* Request Button */}
            <div className="text-center mb-8">
              <button
                onClick={handleEmergencyRequest}
                disabled={!location || isLoading}
                className={`px-8 py-4 text-xl font-bold text-white rounded-xl shadow-lg transition ${
                  !location || isLoading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-bold text-red-600">Emergency Services (US)</div>
              <div className="text-xl font-bold">911</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-bold text-red-600">Poison Control (US)</div>
              <div className="text-xl font-bold">1-800-222-1222</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-bold text-red-600">MediCheck Support</div>
              <div className="text-xl font-bold">1-888-MEDI-HELP</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-bold text-red-600">Mental Health Crisis Line</div>
              <div className="text-xl font-bold">988</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 px-6 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p>© {new Date().getFullYear()} MediCheck. All rights reserved.</p>
          <p className="text-sm mt-2">
            This is an emergency assistance service. For non-emergency medical concerns,
            please <Link to="/" className="text-red-300 hover:text-white">return to the main site</Link>.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default EmergencyPage;