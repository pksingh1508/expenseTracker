import React, { createContext, ReactNode, useEffect, useState } from "react";
import { checkIsRecent } from "../utils/Helper";
import { deleteExpenseById, getAllExpense, insert } from "../utils/Database";

export interface Expense {
    id: string;
    amount: string;
    date: string;
    description: string;
    type: string;
}

interface ExpenseContextProviderProps {
    children: ReactNode;
}

interface ExpenseContextType {
    expenses: Expense[];
    recentExpense: Expense[];
    addExpense: (expense: Expense) => void;
    deleteExpense: (id: string) => void;
    addInitialData: (expenseData: Expense[]) => void;
    totalExpense: number;
    totalCredit: number;
}

export const ExpenseContext = createContext<ExpenseContextType>({
    expenses: [],
    recentExpense: [],
    addExpense: (expense: Expense) => { },
    deleteExpense: (id: string) => { },
    addInitialData: (expenseData: Expense[]) => { },
    totalExpense: 0,
    totalCredit: 0,
})

export const ExpenseContextProvider: React.FC<ExpenseContextProviderProps> = ({ children }) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [recentExpense, setRecentExpense] = useState<Expense[]>([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);

    async function addExpense(expense: Expense) {
        setExpenses((previousData) => [...previousData, expense]);
        await insert(expense.id, Number(expense.amount), expense.date, expense.description, expense.type);
    }
    function addRecentExpense(expense: Expense) {
        if (recentExpense.includes(expense)) {
            return;
        }
        setRecentExpense((previousData) => [...previousData, expense]);
    }

    function addInitialData(expenseData: Expense[]) {
        setExpenses(expenseData);
    }

    function deleteExpense(id: string) {
        const updatedExpense = expenses.filter((expense) => expense.id !== id);
        setExpenses(updatedExpense);
        deleteExpenseById(id);
    }

    useEffect(() => {
        let expenseSum = 0;
        let creditSum = 0;
        for (let i = 0; i < expenses.length; i++) {
            if (checkIsRecent(expenses[i].date)) {
                addRecentExpense(expenses[i]);
            }
            if (expenses[i].type === 'expense') {
                expenseSum += Number(expenses[i].amount);
            } else {
                creditSum += Number(expenses[i].amount);
            }
        }
        setTotalExpense(expenseSum);
        setTotalCredit(creditSum);

    }, [expenses])


    const value = {
        expenses: expenses,
        recentExpense: recentExpense,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        addInitialData: addInitialData,
        totalExpense: totalExpense,
        totalCredit: totalCredit
    }

    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseContextProvider;