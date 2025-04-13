import React, { useState } from 'react'
import { fetchAPI } from '../../lib/fetch-api';

const EMPTY_EXPENSE = {
    title: "",
    amount: ""
}

export default function ExpenseForm({setExpenses}) {
    const [formData, setFormData] = useState(EMPTY_EXPENSE)

    const onChangeField = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    async function onSubmitForm(e) {
        e.preventDefault()
        const { title, amount } = formData
        if (!title || !amount) {
            alert("Please enter valid expense details.")
            return
        }

        const expense = {
            title,
            amount: parseFloat(amount),
        }

        const response = await fetchAPI({
            url: "/expenses",
            method: "POST",
            body: expense
        })

        if(!response) {
            alert("Failed to add expense")
            return
        }

        setExpenses((prevExpenses) => [...prevExpenses, response])
        setFormData(EMPTY_EXPENSE)
    }

  return (
    <form className='w-full grid grid-cols-3 my-2 gap-2' onSubmit={onSubmitForm}>
      <input
        className='p-2 rounded-md bg-zinc-900'
        type="text"
        placeholder="Expense Name"
        onChange={onChangeField}
        name='title'
        required
      />
      <input
        className='p-2 rounded-md bg-zinc-900'
        type="number"
        placeholder="Amount"
        onChange={onChangeField}
        name='amount'
        required
      />
      <button type="submit" className='font-bold'>Add Expense</button>
    </form>
  )
}
