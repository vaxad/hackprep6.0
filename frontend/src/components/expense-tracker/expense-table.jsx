import React from 'react'
import { fetchAPI } from '../../lib/fetch-api'

export default function ExpenseTable({expenses, setExpenses}) {

    async function deleteExpense(expense) {
        const response = await fetchAPI({
            url: `/expenses/${expense._id}`,
            method: "DELETE"
        })

        if(!response) {
            alert("Failed to delete expense")
            return
        }

        setExpenses((prevExpenses) => prevExpenses.filter((e) => e._id !== expense._id))
    }
  const totalAmount = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
  
  return (
    <div>
      <table className='w-full'>
        <thead>
          <tr>
            <th>Expense Name</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {expenses.map((expense, idx)=>(
                <tr key={idx}>
                    <td>{expense.title}</td>
                    <td>${expense.amount}</td>
                    <td>
                        <button onClick={()=> deleteExpense(expense)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
      <div>
        <strong>Total:</strong>
        $<span>{totalAmount}</span>
      </div>
    </div>
  )
}
