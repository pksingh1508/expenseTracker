import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../ui/Button";
import CreditForm from "./CreditForm";
import ExpenseForm from "./ExpenseForm";


function AddExpenseForm() {
    const [isCredit, setIsCredit] = useState(false);
    const [isExpense, setIsExpense] = useState(true);
    function expenseBtnHandler() {
        setIsExpense(true);
        setIsCredit(false);
    }
    function creditBtnHandler() {
        setIsExpense(false);
        setIsCredit(true);
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.btnContainer}>
                <Button onPress={expenseBtnHandler} isActive={isExpense} customStyles={styles.customStyle}>Expense</Button>
                <Button onPress={creditBtnHandler} isActive={isCredit} customStyles={styles.customStyle}>Credit</Button>
            </View>
            <View style={styles.formContainer}>
                {
                    isCredit ?
                        (
                            <CreditForm />
                        ) :
                        (
                            <ExpenseForm />
                        )
                }
            </View>
        </View>
    )
}
export default AddExpenseForm;

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 40,
        paddingHorizontal: 5
    },
    btnContainer: {
        gap: 9,
        flexDirection: 'row'
    },
    formContainer: {
        marginTop: 10
    },
    customStyle: {
        flex: 1
    }
})