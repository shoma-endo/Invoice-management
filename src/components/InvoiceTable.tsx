import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import InvoiceStatusBadge from './InvoiceStatusBadge';
import { Invoice } from '../types/invoice';

interface InvoiceTableProps {
  invoices: Invoice[];
  isAdmin?: boolean;
  onStatusChange?: (invoiceId: number, newStatus: string) => void;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices, isAdmin, onStatusChange }) => {
  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
              請求書番号
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              日付
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              金額
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              ステータス
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">アクション</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-2" />
                  <div className="font-medium text-gray-900">{invoice.number}</div>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {invoice.date}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {invoice.amount}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <InvoiceStatusBadge status={invoice.status} statusColor={invoice.statusColor} />
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <div className="flex justify-end space-x-2">
                  {isAdmin && invoice.status === '審査待ち' && (
                    <>
                      <button
                        onClick={() => onStatusChange?.(invoice.id, '承認済み')}
                        className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-2 py-1 rounded"
                      >
                        承認
                      </button>
                      <button
                        onClick={() => onStatusChange?.(invoice.id, '却下')}
                        className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-2 py-1 rounded"
                      >
                        却下
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    title="プレビュー"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    title="ダウンロード"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;