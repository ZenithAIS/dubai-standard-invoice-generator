
import { InvoiceData } from './types';

export const DEFAULT_INVOICE: InvoiceData = {
  companyName: "Lumina General Trading LLC",
  companyAddress: "Building 42, Business Bay, Dubai, UAE",
  companyTRN: "100234567800003",
  customerName: "Vertex Solutions FZ LLC",
  customerAddress: "Office 701, Al Barsha, Dubai, UAE",
  customerTRN: "100987654300003",
  invoiceNumber: "INV-2024-001",
  invoiceDate: new Date().toISOString().split('T')[0],
  currency: "AED",
  items: [
    { id: '1', description: "Cloud Infrastructure Setup", quantity: 1, unitPrice: 5000, taxRate: 5 },
    { id: '2', description: "Monthly Managed Services", quantity: 12, unitPrice: 450, taxRate: 5 },
    { id: '3', description: "Security Audit (One-time)", quantity: 1, unitPrice: 2500, taxRate: 5 },
  ]
};
