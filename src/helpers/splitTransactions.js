import moment from 'moment';
export const splitTxns = (transactions) => {
  const txns = Array.from(transactions);
  // sum amount by date
  let incomeTxns = {};
  let expenseTxns = {};

  // sum by txn Type
  let txnTotal = {
    income: 0,
    expense: 0,
  };

  // sum by category
  let txnByCategory = {};

  txns.forEach((txn) => {
    let tdate = moment(txn.tdate).format('DD-MM-YYYY');

    txnTotal[txn.type] += txn.amount;

    if (txnByCategory.hasOwnProperty(txn.name)) {
      txnByCategory[txn.name] += txn.amount;
    } else {
      txnByCategory[txn.name] = txn.amount;
    }

    if (txn.type === 'income') {
      if (incomeTxns.hasOwnProperty(tdate)) {
        incomeTxns[tdate] += txn.amount;
      } else {
        incomeTxns[tdate] = txn.amount;
      }
    } else {
      if (expenseTxns.hasOwnProperty(tdate)) {
        expenseTxns[tdate] += txn.amount;
      } else {
        expenseTxns[tdate] = txn.amount;
      }
    }
  });
  return { incomeTxns, expenseTxns, txnTotal, txnByCategory };
};
