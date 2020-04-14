import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const sumIncomes = this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'income') return total + transaction.value;
      return total;
    }, 0);
    const sumOutcomes = this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'outcome') return total + transaction.value;
      return total;
    }, 0);
    const balance = {
      income: sumIncomes,
      outcome: sumOutcomes,
      total: sumIncomes - sumOutcomes,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
