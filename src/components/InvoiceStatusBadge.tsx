import React from 'react';

interface InvoiceStatusBadgeProps {
  status: string;
  statusColor: string;
}

const InvoiceStatusBadge: React.FC<InvoiceStatusBadgeProps> = ({ status, statusColor }) => {
  const getColorClasses = () => {
    switch (statusColor) {
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800';
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'red':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getColorClasses()}`}>
      {status}
    </span>
  );
};

export default InvoiceStatusBadge;