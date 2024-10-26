import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InvoiceUpload = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const removeFile = (file: File) => {
    setFiles(files.filter(f => f !== file));
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 5242880, // 5MB
    multiple: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;

    try {
      setIsUploading(true);
      // 実際の環境では FormData を使用してサーバーにアップロード
      await new Promise(resolve => setTimeout(resolve, 1000));

      // アップロード成功後、グローバルステートを更新
      const newInvoices = files.map((file, index) => ({
        id: Date.now() + index,
        number: `INV-${Math.floor(Math.random() * 10000)}`,
        date: new Date().toISOString().split('T')[0],
        amount: `¥${Math.floor(Math.random() * 1000000).toLocaleString()}`,
        status: '審査待ち',
        statusColor: 'yellow',
        fileName: file.name,
      }));

      localStorage.setItem('invoices', JSON.stringify([
        ...JSON.parse(localStorage.getItem('invoices') || '[]'),
        ...newInvoices
      ]));

      alert('請求書のアップロードが完了しました');
      navigate('/invoices');
    } catch (error) {
      console.error('Upload error:', error);
      alert('アップロードに失敗しました');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            請求書アップロード
          </h2>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div {...getRootProps()} className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}>
            <div className="space-y-1 text-center">
              <input {...getInputProps()} />
              <div className="flex justify-center">
                <Upload className={`h-12 w-12 ${isDragActive ? 'text-indigo-500' : 'text-gray-400'}`} />
              </div>
              <div className="flex text-sm text-gray-600">
                <p className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  クリックしてファイルを選択
                </p>
                <p className="pl-1">またはドラッグ＆ドロップ</p>
              </div>
              <p className="text-xs text-gray-500">PDFファイルのみ (最大5MB)</p>
            </div>
          </div>

          {fileRejections.length > 0 && (
            <div className="mt-2 text-sm text-red-600">
              {fileRejections.map(({ file, errors }) => (
                <div key={file.name}>
                  {errors.map(error => (
                    <p key={error.code}>
                      {error.code === 'file-invalid-type'
                        ? 'PDFファイルのみアップロード可能です'
                        : error.code === 'file-too-large'
                        ? 'ファイルサイズは5MB以下にしてください'
                        : error.message}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          )}

          {files.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900">選択されたファイル</h4>
              <ul className="mt-4 divide-y divide-gray-200">
                {files.map((file, index) => (
                  <li key={index} className="py-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <File className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm text-gray-900">{file.name}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(file)}
                      className="ml-4 flex-shrink-0 text-sm font-medium text-red-600 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isUploading}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                    isUploading
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  }`}
                >
                  {isUploading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      アップロード中...
                    </>
                  ) : (
                    'アップロード'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceUpload;