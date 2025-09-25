import React from 'react';

const ServerErrorPage = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">500 - Server Error</h1>
        <p className="text-gray-600 mt-2">Something went wrong on our end</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-700">
          This is the 500 - Server Error page. Content will be implemented here.
        </p>
      </div>
    </div>
  );
};

export default ServerErrorPage;
