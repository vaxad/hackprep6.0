import Expense from "../db/models/expense.js"

export async function getExpenses(req, res){
    try {
        const expenses=await Expense.find()
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function addExpense(req, res){
    try {
        const expense=await Expense.create(req.body)
        res.status(200).json(expense)
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function updateExpense(req,res){
    try {
        const id=req.params.id
        const expense=await Expense.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({Updated:'true',expense})
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function deleteExpense(req,res){
    try {
        const id=req.params.id
        const expense=await Expense.findByIdAndDelete(id)
        res.status(200).json({Deleted:'true',expense})
    } catch (error) {
        res.status(500).json(error)
    }
}