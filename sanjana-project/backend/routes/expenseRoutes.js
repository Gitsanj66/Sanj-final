
const express = require('express');
const router = express.Router();
const jwtCheck = require('../middlewares/jwtCheck');
const expenseController = require('../controllers/expenseController');

router.post('/', jwtCheck, expenseController.createExpense);
router.get('/', jwtCheck, expenseController.getExpenses);
router.put('/:id', jwtCheck, expenseController.updateExpense);
router.delete('/:id', jwtCheck, expenseController.deleteExpense);
router.get('/total', jwtCheck, expenseController.getTotalExpenses);
router.get('/monthly', jwtCheck, expenseController.getMonthlyExpenses);

module.exports = router;
