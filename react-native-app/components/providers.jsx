import React from "react"

export const ExpenseContext = React.createContext(null)

export function ExpenseProvider({ children, value }) {
    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    )
}

export default function useExpenseContext() {
    const context = React.useContext(ExpenseContext)
    if (!context) {
        throw new Error('useExpenseContext must be used within an ExpenseProvider')
    }
    return context
}