import * as SQLite from 'expo-sqlite';
import { Expense } from '../store/ExpenseContext';

async function init() {
    try {
        const db = await SQLite.openDatabaseAsync('expenseDb');

        await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS expense (
            id TEXT PRIMARY KEY NOT NULL,
            amount REAL NOT NULL,
            date TEXT NOT NULL,
            description TEXT NOT NULL,
            type TEXT NOT NULL
        );
        `);
        console.log("db initialized successfully");
    } catch (e) {
        console.log("failed to initialize database", e);
    }
}

async function insert(id: string, amount: number, date: string, description: string, type: string) {
    try {
        const db = await SQLite.openDatabaseAsync('expenseDb');
        const result = await db.runAsync('INSERT INTO expense (id,amount, date, description, type) VALUES (?,?, ?,?,?)', id, amount, date, description, type);
        console.log(result);
    } catch (e) {
        console.log("Failed to insert", e);
    }
}

async function deleteExpenseById(id: string) {
    try {
        const db = await SQLite.openDatabaseAsync('expenseDb');
        await db.runAsync('DELETE FROM expense WHERE id = $id', { $id: id });
        console.log("deleted Successfully");
    } catch (e) {
        console.log("Error while deleting the expense.", e)
    }
}

async function getAllExpense() {
    try {
        const db = await SQLite.openDatabaseAsync('expenseDb');
        const allRows = await db.getAllAsync('SELECT * FROM expense');
        return allRows || [];
    } catch (e) {
        console.log("Couldnot get Expenses", e);
        return [];
    }
}



export { init, insert, deleteExpenseById, getAllExpense };