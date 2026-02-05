
import React from 'react';
import { InvoiceData, LineItem } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

const InvoiceForm: React.FC<Props> = ({ data, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleItemChange = (id: string, field: keyof LineItem, value: any) => {
    const newItems = data.items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange({ ...data, items: newItems });
  };

  const addItem = () => {
    const newItem: LineItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: 'New Service/Item',
      quantity: 1,
      unitPrice: 0,
      taxRate: 5
    };
    onChange({ ...data, items: [...data.items, newItem] });
  };

  const removeItem = (id: string) => {
    onChange({ ...data, items: data.items.filter(item => item.id !== id) });
  };

  const InputGroup = ({ label, name, value, type = "text", placeholder = "" }: any) => (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-tight">{label}</label>
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={handleInputChange} 
        placeholder={placeholder}
        className="px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
      />
    </div>
  );

  return (
    <div className="space-y-8 pb-20">
      <section>
        <h3 className="text-sm font-black text-slate-900 uppercase border-b pb-2 mb-4">Company Details (Seller)</h3>
        <InputGroup label="Company Name" name="companyName" value={data.companyName} />
        <InputGroup label="Address" name="companyAddress" value={data.companyAddress} />
        <InputGroup label="TRN (15 digits)" name="companyTRN" value={data.companyTRN} />
      </section>

      <section>
        <h3 className="text-sm font-black text-slate-900 uppercase border-b pb-2 mb-4">Invoice Info</h3>
        <div className="grid grid-cols-2 gap-4">
          <InputGroup label="Invoice #" name="invoiceNumber" value={data.invoiceNumber} />
          <InputGroup label="Date" name="invoiceDate" type="date" value={data.invoiceDate} />
        </div>
        <InputGroup label="Currency" name="currency" value={data.currency} />
      </section>

      <section>
        <h3 className="text-sm font-black text-slate-900 uppercase border-b pb-2 mb-4">Customer Details (Buyer)</h3>
        <InputGroup label="Customer Name" name="customerName" value={data.customerName} />
        <InputGroup label="Customer Address" name="customerAddress" value={data.customerAddress} />
        <InputGroup label="Customer TRN (Optional)" name="customerTRN" value={data.customerTRN} />
      </section>

      <section>
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-sm font-black text-slate-900 uppercase">Line Items</h3>
          <button 
            onClick={addItem}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id} className="p-3 bg-slate-50 border rounded-lg relative group">
              <button 
                onClick={() => removeItem(item.id)}
                className="absolute -top-2 -right-2 bg-white text-red-500 p-1 rounded-full border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
              <input 
                value={item.description}
                onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                className="w-full bg-transparent border-b border-transparent focus:border-slate-300 font-bold mb-2 outline-none"
                placeholder="Description"
              />
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-400 font-bold">Qty</label>
                  <input 
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                    className="bg-white border rounded px-1 py-1 text-xs outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-400 font-bold">Price</label>
                  <input 
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    className="bg-white border rounded px-1 py-1 text-xs outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-400 font-bold">VAT %</label>
                  <input 
                    type="number"
                    value={item.taxRate}
                    onChange={(e) => handleItemChange(item.id, 'taxRate', parseFloat(e.target.value) || 0)}
                    className="bg-white border rounded px-1 py-1 text-xs outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default InvoiceForm;
