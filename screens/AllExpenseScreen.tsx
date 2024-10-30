import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import { useContext } from "react";
import { ExpenseContext } from "../store/ExpenseContext";
import ExpenseList from "../components/Expense/ExpenseList";


function AllExpensesScreen() {

    const { expenses, totalExpense, totalCredit, deleteExpense } = useContext(ExpenseContext);

    function deleteExpenseHandler(id: string) {
        deleteExpense(id);
    }

    if (expenses.length === 0) {
        return (
            <View style={{ backgroundColor: Colors.primary600, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: Colors.text, fontSize: 18 }}>Abhi koi kharcha nahi hai.</Text>
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.totalContainer}>
                <View style={styles.totalBox}>
                    <Text style={styles.totalText}>Total Credit</Text>
                    <Text style={styles.totalAmountCredit}>₹{totalCredit}</Text>
                </View>
                <View style={styles.totalBox}>
                    <Text style={styles.totalText}>Total Expense</Text>
                    <Text style={styles.totalAmountExpense}>₹{totalExpense}</Text>
                </View>

            </View>
            <Text style={styles.deleteText}>Long Press to Delete.</Text>
            <FlatList
                data={expenses}
                renderItem={({ item }) => (<ExpenseList data={item} onPress={deleteExpenseHandler} />)}
                keyExtractor={(item) => item.id}
            />

        </View>
    )
}
export default AllExpensesScreen;


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.primary600
    },
    totalBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    totalContainer: {
        backgroundColor: Colors.secondary100,
        borderWidth: 1,
        borderColor: Colors.text,
        borderRadius: 7,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginHorizontal: 2,
        marginVertical: 5,
        gap: 4
    },
    totalText: {
        color: Colors.secondaryText,
        fontSize: 17
    },
    totalAmountExpense: {
        color: 'red',
        fontSize: 17,
        fontWeight: 'bold'
    },
    totalAmountCredit: {
        color: 'green',
        fontSize: 17,
        fontWeight: 'bold'
    },
    deleteText: {
        color: Colors.secondaryText,
        textAlign: 'center',
        marginVertical: 5
    }
})