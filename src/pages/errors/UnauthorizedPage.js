import React from 'react';

const UnauthorizedPage = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">401 - Unauthorized</h1>
        <p className="text-gray-600 mt-2">You don't have permission to access this page</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-700">
          This is the 401 - Unauthorized page. Content will be implemented here.
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
