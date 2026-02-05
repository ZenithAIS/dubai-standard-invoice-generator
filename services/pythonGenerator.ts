
import { InvoiceData } from '../types';

export const generatePythonCode = (data: InvoiceData): string => {
  return `import json
from fpdf import FPDF

def create_invoice(data):
    # PDF Configuration
    pdf = FPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)
    
    # Note: For Arabic support in FPDF2, you must download a Unicode font (e.g., DejaVuSans.ttf)
    # and use pdf.add_font('DejaVu', '', 'DejaVuSans.ttf', uni=True)
    # This template uses standard fonts for demonstration.
    
    # 1. Header (Tax Invoice)
    pdf.set_font("Helvetica", "B", 16)
    pdf.cell(0, 10, "TAX INVOICE / فاتورة ضريبية", ln=True, align="C")
    pdf.ln(10)

    # 2. Company Info (Left) and Invoice Info (Right)
    pdf.set_font("Helvetica", "B", 10)
    col_width = pdf.w / 2.5
    
    # Seller
    pdf.cell(col_width, 6, "SELLER / البائع", ln=0)
    # Spacing to right
    pdf.set_x(pdf.w - col_width - 15)
    pdf.cell(col_width, 6, "INVOICE DETAILS / تفاصيل الفاتورة", ln=1)
    
    pdf.set_font("Helvetica", "", 10)
    # Company Details
    pdf.cell(col_width, 5, data['companyName'], ln=0)
    pdf.set_x(pdf.w - col_width - 15)
    pdf.cell(col_width, 5, f"Invoice #: {data['invoiceNumber']}", ln=1)
    
    pdf.cell(col_width, 5, data['companyAddress'], ln=0)
    pdf.set_x(pdf.w - col_width - 15)
    pdf.cell(col_width, 5, f"Date: {data['invoiceDate']}", ln=1)
    
    pdf.cell(col_width, 5, f"TRN: {data['companyTRN']}", ln=1)
    pdf.ln(10)

    # 3. Buyer Info
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(0, 6, "BUYER / المشتري", ln=True)
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(0, 5, data['customerName'], ln=True)
    pdf.cell(0, 5, data['customerAddress'], ln=True)
    pdf.cell(0, 5, f"TRN: {data['customerTRN']}", ln=True)
    pdf.ln(10)

    # 4. Line Items Table
    # Table Header
    pdf.set_font("Helvetica", "B", 9)
    pdf.set_fill_color(240, 240, 240)
    
    headers = ["Description", "Qty", "Unit Price", "VAT %", "VAT Amt", "Total"]
    widths = [60, 20, 30, 20, 30, 30]
    
    for i, header in enumerate(headers):
        pdf.cell(widths[i], 10, header, border=1, align="C", fill=True)
    pdf.ln()

    # Table Body
    pdf.set_font("Helvetica", "", 9)
    total_excl_vat = 0
    total_vat = 0

    for item in data['items']:
        qty = item['quantity']
        price = item['unitPrice']
        tax_rate = item['taxRate']
        
        excl_vat = qty * price
        vat_amt = excl_vat * (tax_rate / 100)
        row_total = excl_vat + vat_amt
        
        total_excl_vat += excl_vat
        total_vat += vat_amt
        
        pdf.cell(widths[0], 8, item['description'], border=1)
        pdf.cell(widths[1], 8, str(qty), border=1, align="C")
        pdf.cell(widths[2], 8, f"{price:,.2f}", border=1, align="R")
        pdf.cell(widths[3], 8, f"{tax_rate}%", border=1, align="C")
        pdf.cell(widths[4], 8, f"{vat_amt:,.2f}", border=1, align="R")
        pdf.cell(widths[5], 8, f"{row_total:,.2f}", border=1, align="R")
        pdf.ln()

    # 5. Totals
    pdf.ln(5)
    pdf.set_x(pdf.w - 100)
    pdf.set_font("Helvetica", "B", 10)
    
    total_incl_vat = total_excl_vat + total_vat
    
    pdf.cell(45, 8, "Total Excl. VAT:", ln=0)
    pdf.cell(40, 8, f"{data['currency']} {total_excl_vat:,.2f}", ln=1, align="R")
    
    pdf.set_x(pdf.w - 100)
    pdf.cell(45, 8, "VAT Amount (5%):", ln=0)
    pdf.cell(40, 8, f"{data['currency']} {total_vat:,.2f}", ln=1, align="R")
    
    pdf.set_x(pdf.w - 100)
    pdf.set_fill_color(230, 240, 255)
    pdf.cell(45, 10, "Total Incl. VAT:", border=1, fill=True)
    pdf.cell(40, 10, f"{data['currency']} {total_incl_vat:,.2f}", border=1, fill=True, align="R")

    # Output
    output_filename = f"invoice_{data['invoiceNumber']}.pdf"
    pdf.output(output_filename)
    print(f"Invoice generated: {output_filename}")

if __name__ == "__main__":
    # Load from JSON file (as requested)
    with open('invoice_data.json', 'r') as f:
        invoice_data = json.load(f)
    
    create_invoice(invoice_data)
`;
};
