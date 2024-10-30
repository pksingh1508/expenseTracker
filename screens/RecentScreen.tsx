import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import { useContext, useEffect, useState } from "react";
import { Expense, ExpenseContext } from "../store/ExpenseContext";
import { checkIsRecent } from "../utils/Helper";
import ExpenseList from "../components/Expense/ExpenseList";
import { getAllExpense } from "../utils/Database";


function RecentScreen() {

    const { recentExpense, addInitialData } = useContext(ExpenseContext);

    function deleteExpenseHandler(id: string) {
        // deleteExpense(id);
    }

    useEffect(() => {
        async function setValue() {
            const data = await getAllExpense();
            const expenseData: Expense[] = data ? (data as Expense[]) : [];
            addInitialData(expenseData);
        }
        setValue();
    }, [])

    if (recentExpense.length === 0) {
        return (
            <View style={{ backgroundColor: Colors.primary600, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: Colors.text, fontSize: 18 }}>No Recent Activity.</Text>
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.text}>Last 7 days Activity</Text>
            <FlatList
                data={recentExpense}
                renderItem={({ item }) => (<ExpenseList data={item} onPress={deleteExpenseHandler} />)}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}
export default RecentScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.primary600
    },
    text: {
        color: Colors.text,
        textAlign: 'center',
        marginVertical: 6
    }
})