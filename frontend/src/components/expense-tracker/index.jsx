import React, { useEffect } from 'react'
import { fetchAPI } from '../../lib/fetch-api'
import ExpenseTable from './expense-table'
import ExpenseForm from './form'

export default function ExpenseTracker() {
    const [expenses, setExpenses] = React.useState([])

    async function getExpenses() {
        const expenses = await fetchAPI({
            url: "/expenses",
        })
        setExpenses(expenses)
    }

    useEffect(() => {
        void getExpenses()
    }, [])

  return (
    <div className="min-w-2xl">
    <h1 className="font-bold">Expense Tracker</h1>
    <ExpenseForm setExpenses={setExpenses}/>
    <ExpenseTable expenses={expenses}setExpenses={setExpenses}/>
  </div>
  )
}
