import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload } from 'lucide-react';
import InvoiceTable from '../components/InvoiceTable';
import { Invoice } from '../types/invoice';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    // ローカルストレージから請求書データを取得
    const storedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    if (storedInvoices.length === 0) {
      // 初期データがない場合はサンプルデータを設定
      const initialInvoices = [
        {
          id: 1,
          number: 'INV-2024-001',
          date: '2024-03-15',
          amount: '¥150,000',
          status: '審査待ち',
          statusColor: 'yellow',
        },
        {
          id: 2,
          number: 'INV-2024-002',
          date: '2024-03-14',
          amount: '¥280,000',
          status: '承認済み',
          statusColor: 'green',
        },
        {
          id: 3,
          number: 'INV-2024-003',
          date: '2024-03-13',
          amount: '¥95,000',
          status: '却下',
          statusColor: 'red',
        },
      ];
      localStorage.setItem('invoices', JSON.stringify(initialInvoices));
      setInvoices(initialInvoices);
    } else {
      setInvoices(storedInvoices);
    }
  }, []);

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            請求書一覧
          </h2>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/invoices/upload"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Upload className="h-4 w-4 mr-2" />
            新規アップロード
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <InvoiceTable invoices={invoices} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;