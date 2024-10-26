import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-indigo-600">404</h1>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            ページが見つかりません
          </h2>
          <p className="mt-2 text-base text-gray-500">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Home className="h-4 w-4 mr-2" />
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;