// services/reportGenerator.js

import jsPDF from 'jspdf';
import 'jspdf-autotable';

import moment from 'moment';

// define a generatePDF function that accepts a transactions argument
export const generatePDF = (transactions) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ['Ref no', 'Amount', 'Category', 'Done at', 'Purpose'];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  transactions.forEach((transaction) => {
    const transactionData = [
      transaction.id,
      transaction.amount,
      transaction.name,

      moment(transaction.tdate).format('YYYY-MM-DDTHH:MM:SS'),
      transaction.description,
    ];
    // push each transaction's info into a row
    tableRows.push(transactionData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(' ');
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text('Transaction report', 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};
