import React from "react";

const PageError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="text-xl text-gray-700 mt-2">Page Not Found</p>
    </div>
  );
};

export default PageError;
