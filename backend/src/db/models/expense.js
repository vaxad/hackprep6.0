import mongoose from "mongoose";

const expenseSchema=new mongoose.Schema({
    title:{
        type:String
    },
    category:{
        type:String
    },
    amount:{
        type:Number
    }
})

const Expense=mongoose.model("Expense",expenseSchema)

export default Expense