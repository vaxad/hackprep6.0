import { addExpense, deleteExpense, getExpenses, updateExpense } from "../controllers/expense.js";
import { Router } from "express";

const expenseRouter = Router()

expenseRouter.get('/', getExpenses);
expenseRouter.post('/', addExpense);
expenseRouter.put('/:id',updateExpense)
expenseRouter.delete('/:id', deleteExpense)

export default expenseRouter