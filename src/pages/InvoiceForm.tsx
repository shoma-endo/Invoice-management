import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FormData {
  name: string;
  email: string;
  amount: string;
  files: File[];
}

const InvoiceForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    amount: '',
    files: [],
  });

  const isProduction = process.env.NODE_ENV === 'production';

  const onDrop = (acceptedFiles: File[]) => {
    setFormData(prev => ({ ...prev, files: [...prev.files, ...acceptedFiles] }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxSize: 5242880, // 5MB
    multiple: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const confirmed = window.confirm('この内容で送信してよろしいですか？');
    if (!confirmed) return;

    if (formData.files.length > 0) {
      formData.files.forEach(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = () => {
          const base64File = reader.result as string;
          const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
          const newInvoice = {
            id: Date.now(),
            name: formData.name,
            email: formData.email,
            amount: formData.amount,
            date: new Date().toISOString().split('T')[0],
            fileName: file.name,
            file: base64File, // Base64として保存
          };

          localStorage.setItem('invoices', JSON.stringify([...invoices, newInvoice]));
        };
      });
        
        // フォームをリセット
        setFormData({
          name: '',
          email: '',
          amount: '',
          files: [],
        });

        alert('請求書が送信されました');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">請求書提出フォーム</h1>
        </div>
        {!isProduction && (
          <div className="flex justify-end mb-4">
            <Link
              to="/admin"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              管理画面へ
            </Link>
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                お名前 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                金額（税込） <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="amount"
                  required
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="10,000"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">円</span>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-400">
                ※複数のPDFをアップロードする場合は総額を記載
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                請求書（PDF） <span className="text-red-500">*</span>
              </label>
              <div
                {...getRootProps()}
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                  isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
                }`}
              >
                <div className="space-y-1 text-center">
                  <input {...getInputProps()} />
                  <div className="flex justify-center">
                    {formData.files.length > 0 ? (
                      formData.files.map((_, index) => (
                        <FileText key={index} className="h-12 w-12 text-indigo-500" />
                      ))
                    ) : (
                      <Upload className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <div className="flex text-sm text-gray-600">
                    <p className="pl-1">
                      {formData.files.length > 0 ? (
                        formData.files.map((file, index) => (
                          <span key={index} className="text-indigo-600">{file.name}</span>
                        ))
                      ) : (
                        'ドラッグ＆ドロップまたはクリックしてファイルを選択'
                      )}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">PDFファイル (最大5MB)</p>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                送信
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;