import React from 'react';
import AppStore from '../assets/AppStore.png';
import Playstore from '../assets/Playstore.png';

const DownloadApp = () => {
  return (
    <>
      <div className="download-app bg-gray-100 py-10" style={{ height: "400px" }}>
        <div className="container mx-auto px-6 h-full flex items-center justify-center">
          <div className="download-app__content flex flex-col items-center text-center space-y-6">
            {/* Header */}
            <div className="download-app__content__text">
              <h2 className="text-4xl font-extrabold text-gray-800">Download Our App</h2>
              <p className="text-lg text-gray-600 mt-2">
                Experience the best with our easy-to-use app.
              </p>
            </div>
            
            {/* Buttons */}
            <div className="download-app__content__buttons flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.apple.com/sg/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition duration-300"
              >
                <img
                  src={AppStore}
                  alt="App Store"
                  className="w-48 h-14 sm:h-16 rounded-lg shadow-md"
                />
              </a>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition duration-300"
              >
                <img
                  src={Playstore}
                  alt="Google Play"
                  className="w-48 h-14 sm:h-16 rounded-lg shadow-md"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadApp;
