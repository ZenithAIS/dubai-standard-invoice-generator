
import React, { useState } from 'react';
import { DEFAULT_INVOICE } from './constants';
import { InvoiceData } from './types';
import InvoicePreview from './components/InvoicePreview';
import InvoiceForm from './components/InvoiceForm';
import { generatePythonCode } from './services/pythonGenerator';
import { FileCode, Layout, Copy, Check, Download, Info } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<InvoiceData>(DEFAULT_INVOICE);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const pythonCode = generatePythonCode(data);
  const jsonData = JSON.stringify(data, null, 2);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black italic">V</div>
          <h1 className="font-bold text-slate-800 text-lg">UAE VAT Invoice Builder</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200">
            <Info size={14} />
            Complies with FTA Regulations
          </div>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            <Download size={16} />
            Export PDF
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[380px] border-r bg-white overflow-y-auto hidden lg:block p-6">
          <InvoiceForm data={data} onChange={setData} />
        </aside>

        {/* Content Area */}
        <section className="flex-1 flex flex-col bg-slate-100 overflow-y-auto">
          {/* Tabs */}
          <div className="flex justify-center p-4 bg-white border-b gap-4">
            <button 
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeTab === 'preview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <Layout size={16} />
              Visual Preview
            </button>
            <button 
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeTab === 'code' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <FileCode size={16} />
              Developer Code
            </button>
          </div>

          <div className="p-8 flex justify-center">
            {activeTab === 'preview' ? (
              <InvoicePreview data={data} />
            ) : (
              <div className="w-full max-w-4xl space-y-6">
                {/* Python Script Section */}
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-3 bg-slate-50 border-b">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">generate_invoice.py (FPDF)</span>
                    <button 
                      onClick={() => handleCopy(pythonCode)}
                      className="text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 text-xs font-bold"
                    >
                      {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-slate-800 overflow-x-auto bg-slate-900 text-slate-300">
                    <code>{pythonCode}</code>
                  </pre>
                </div>

                {/* JSON Data Section */}
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-3 bg-slate-50 border-b">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">invoice_data.json</span>
                    <button 
                      onClick={() => handleCopy(jsonData)}
                      className="text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 text-xs font-bold"
                    >
                      <Copy size={14} />
                      Copy JSON
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-slate-800 overflow-x-auto bg-slate-900 text-slate-300">
                    <code>{jsonData}</code>
                  </pre>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
                  <p className="font-bold flex items-center gap-2 mb-2">
                    <Info size={16} />
                    Developer Instructions
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Install requirements: <code className="bg-blue-100 px-1 py-0.5 rounded">pip install fpdf2</code></li>
                    <li>Save both files in the same directory.</li>
                    <li>Run script: <code className="bg-blue-100 px-1 py-0.5 rounded">python generate_invoice.py</code></li>
                    <li>The layout uses bilingual headers as required by UAE law.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Mobile Drawer Trigger (Simplified) */}
      <div className="lg:hidden fixed bottom-6 right-6 z-[60]">
        <button 
          className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-all"
          onClick={() => alert("Sidebar is optimized for desktop usage in this tool.")}
        >
          <Layout size={24} />
        </button>
      </div>
    </div>
  );
};

export default App;
