import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const generateInvoicePDF = async (order) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 750]);
  const { width, height } = page.getSize();
  const fontSize = 12;

  console.log(order)

  // Embed fonts
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helveticaObliqueFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const drawText = (text, x, y, size = fontSize, font = helveticaFont) => {
    page.drawText(text, {
      x,
      y,
      size,
      font,
      color: rgb(0, 0, 0),
    });
  };

  const yStart = height - 50;

  // Header
  drawText('INVOICE', 50, yStart, 20, helveticaBoldFont);
  drawText(`Order ID: ${order._id}`, 50, yStart - 30, 14, helveticaBoldFont);

  // Customer details
  const yCustomerStart = yStart - 60;
  drawText('Customer Details:', 50, yCustomerStart, 14, helveticaBoldFont);
  drawText(`Name: ${order.customerName}`, 50, yCustomerStart - 20);
  drawText(`Email: ${order.email}`, 50, yCustomerStart - 40);
  drawText(`Phone: ${order.phone}`, 50, yCustomerStart - 60);

  // Order items
  const yItemsStart = yCustomerStart - 110;
  drawText('Order Items:', 50, yItemsStart, 14, helveticaBoldFont);
  const yItemsHeader = yItemsStart - 20;
  drawText('Product', 50, yItemsHeader, 12, helveticaBoldFont);
  drawText('Quantity', 250, yItemsHeader, 12, helveticaBoldFont);
  drawText('Subtotal', 400, yItemsHeader, 12, helveticaBoldFont);

  let yPosition = yItemsHeader - 20;
  order.items.forEach((item, index) => {
    drawText(`${index + 1}. ${item.product.name}`, 50, yPosition);
    drawText(`${item.quantity}`, 250, yPosition);
    drawText(`$${item.subtotal.toFixed(2)}`, 400, yPosition);
    yPosition -= 20;
  });

  // Total
  drawText(`Total: $${order.total.toFixed(2)}`, 400, yPosition - 30, 14, helveticaBoldFont);

  // Footer
  drawText('Thank you for your business!', 50, 50, 12, helveticaObliqueFont);

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  window.open(url);
};
