import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Upload, Home, FileText } from 'lucide-react';

const UserLayout = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-gray-900">請求書管理システム</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/app"
                  className={`${
                    location.pathname === '/app'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <Home className="h-4 w-4 mr-2" />
                  ダッシュボード
                </Link>
                <Link
                  to="/app/invoices"
                  className={`${
                    location.pathname.startsWith('/app/invoices') && location.pathname !== '/app/invoices/upload'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  請求書一覧
                </Link>
                <Link
                  to="/app/invoices/upload"
                  className={`${
                    location.pathname === '/app/invoices/upload'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  アップロード
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link
                to="/admin"
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                管理画面へ
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;