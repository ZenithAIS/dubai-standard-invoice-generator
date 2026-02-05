
import React from 'react';
import { InvoiceData } from '../types';

interface Props {
  data: InvoiceData;
}

const InvoicePreview: React.FC<Props> = ({ data }) => {
  const calculateTotals = () => {
    let subtotal = 0;
    let vat = 0;
    data.items.forEach(item => {
      const lineTotal = item.quantity * item.unitPrice;
      subtotal += lineTotal;
      vat += lineTotal * (item.taxRate / 100);
    });
    return { subtotal, vat, total: subtotal + vat };
  };

  const { subtotal, vat, total } = calculateTotals();

  return (
    <div className="bg-white p-8 md:p-12 shadow-2xl rounded-sm border border-slate-200 min-h-[842px] w-full max-w-[800px] mx-auto text-sm">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-[10px] text-center p-1">
            COMPANY LOGO
          </div>
          <div>
            <h1 className="text-xl font-bold uppercase tracking-tight">{data.companyName}</h1>
            <p className="text-slate-600 leading-tight whitespace-pre-line">{data.companyAddress}</p>
            <p className="font-semibold mt-1">TRN: {data.companyTRN}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-black text-slate-900 mb-1">TAX INVOICE</h2>
          <h2 className="text-xl font-bold arabic-font text-slate-700">فاتورة ضريبية</h2>
          <div className="mt-4 space-y-1">
            <p><span className="text-slate-500">Invoice #:</span> <span className="font-bold">{data.invoiceNumber}</span></p>
            <p><span className="text-slate-500">Date:</span> <span className="font-bold">{data.invoiceDate}</span></p>
          </div>
        </div>
      </div>

      {/* Addresses */}
      <div className="grid grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 border-b pb-1 flex justify-between">
            <span>Customer Details</span>
            <span className="arabic-font text-xs">بيانات العميل</span>
          </h3>
          <p className="font-bold text-base">{data.customerName}</p>
          <p className="text-slate-600 mt-1 whitespace-pre-line">{data.customerAddress}</p>
          {data.customerTRN && <p className="font-semibold mt-2">TRN: {data.customerTRN}</p>}
        </div>
      </div>

      {/* Table */}
      <table className="w-full mb-8 border-collapse">
        <thead>
          <tr className="bg-slate-800 text-white text-xs uppercase tracking-wider">
            <th className="py-3 px-4 text-left border border-slate-700">Description / الوصف</th>
            <th className="py-3 px-2 text-center border border-slate-700">Qty</th>
            <th className="py-3 px-2 text-right border border-slate-700">Price</th>
            <th className="py-3 px-2 text-center border border-slate-700">VAT %</th>
            <th className="py-3 px-2 text-right border border-slate-700">VAT Amt</th>
            <th className="py-3 px-4 text-right border border-slate-700">Total ({data.currency})</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {data.items.map((item) => {
            const lineSub = item.quantity * item.unitPrice;
            const lineVat = lineSub * (item.taxRate / 100);
            return (
              <tr key={item.id}>
                <td className="py-4 px-4 border border-slate-200 font-medium">{item.description}</td>
                <td className="py-4 px-2 border border-slate-200 text-center">{item.quantity}</td>
                <td className="py-4 px-2 border border-slate-200 text-right">{item.unitPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td className="py-4 px-2 border border-slate-200 text-center">{item.taxRate}%</td>
                <td className="py-4 px-2 border border-slate-200 text-right">{lineVat.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td className="py-4 px-4 border border-slate-200 text-right font-bold">{(lineSub + lineVat).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Summary */}
      <div className="flex justify-end">
        <div className="w-full max-w-[300px] space-y-3">
          <div className="flex justify-between items-center text-slate-600">
            <span>Total (Excl. VAT)</span>
            <span className="font-semibold">{data.currency} {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>Total VAT (5%)</span>
            <span className="font-semibold">{data.currency} {vat.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t-2 border-slate-800 text-lg">
            <div className="flex flex-col">
              <span className="font-black text-slate-900 uppercase">Total Payable</span>
              <span className="arabic-font text-sm font-bold text-slate-600 leading-none">إجمالي المستحق</span>
            </div>
            <span className="font-black text-slate-900">{data.currency} {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 border-t pt-6 text-center text-slate-400 text-xs">
        <p>This is a computer-generated document. No signature is required.</p>
        <p className="mt-1 font-semibold uppercase">Thank you for your business!</p>
      </div>
    </div>
  );
};

export default InvoicePreview;
