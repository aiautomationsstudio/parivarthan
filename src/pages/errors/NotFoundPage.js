import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">404 - Page Not Found</h1>
        <p className="text-gray-600 mt-2">The page you're looking for doesn't exist</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-700">
          This is the 404 - Page Not Found page. Content will be implemented here.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
