
const BudgetTable = require('../models/Budget');

exports.createBudget = async (req, res) => {
  try {
    const { title, amount } = req.body;
    
    const newBudget = new BudgetTable({
      title,
      amount,
      userCreated: req.user.userId, 
    });

    const savedBudget = await newBudget.save();

    res.status(201).json(savedBudget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getBudgets = async (req, res) => {
  try {
    const budgets = await BudgetTable.find({ userCreated: req.user.userId });
    res.json(budgets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateBudget = async (req, res) => {
  try {
    const { title, amount } = req.body;

    const updatedBudget = await BudgetTable.findByIdAndUpdate(
      req.params.id,
      { title, amount },
      { new: true }
    );

    if (!updatedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.json(updatedBudget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    const deletedBudget = await BudgetTable.findByIdAndDelete(req.params.id);

    if (!deletedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getTotalBudget = async (req, res) => {
  try {
    const totalBudget = await BudgetTable.aggregate([
      { $match: { userCreated: req.user.userId } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    if (totalBudget.length === 0) {
      return res.json({ totalBudget: 0 });
    }

    res.json({ totalBudget: totalBudget[0].total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

