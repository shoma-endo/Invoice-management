import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InvoiceForm from './pages/InvoiceForm';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InvoiceForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;