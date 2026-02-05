
export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number; // Percentage (e.g. 5)
}

export interface InvoiceData {
  companyName: string;
  companyAddress: string;
  companyTRN: string;
  customerName: string;
  customerAddress: string;
  customerTRN: string;
  invoiceNumber: string;
  invoiceDate: string;
  currency: string;
  items: LineItem[];
}
