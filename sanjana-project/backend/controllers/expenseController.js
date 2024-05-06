
const ExpenseTable = require('../models/Expense');

exports.createExpense = async (req, res) => {
  try {
    const { amount, comment, category } = req.body;

    const newExpense = new ExpenseTable({
      amount,
      comment,
      userCreated: req.user.userId,
      category,
    });

    const savedExpense = await newExpense.save();

    res.status(201).json(savedExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseTable.find({ userCreated: req.user.userId });
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { amount, comment, category } = req.body;

    const updatedExpense = await ExpenseTable.findByIdAndUpdate(
      req.params.id,
      { amount, comment, category },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(updatedExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await ExpenseTable.findByIdAndDelete(req.params.id);

    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getTotalExpenses = async (req, res) => {
  try {
    const totalExpenses = await ExpenseTable.getTotalExpenses(req.user.userId);
    res.json({ totalExpenses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getMonthlyExpenses = async (req, res) => {
  try {
    const totalExpensesByMonth = {};
    const allExpenses = await ExpenseTable.find({ userCreated: req.user.userId });

    allExpenses.forEach((expense) => {
      const monthYear = expense.date.toISOString().slice(0, 7);
      if (!totalExpensesByMonth[monthYear]) {
        totalExpensesByMonth[monthYear] = 0;
      }
      totalExpensesByMonth[monthYear] += expense.amount;
    });

    res.json(totalExpensesByMonth);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
