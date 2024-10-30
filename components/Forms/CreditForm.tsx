import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import Button from "../ui/Button";
import { DatePicker } from "../ui/DatePicker";
import { useContext, useState } from "react";
import { ExpenseContext } from "../../store/ExpenseContext";
import { generateRandomId } from "../../utils/Helper";


function CreditForm() {

    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const { addExpense } = useContext(ExpenseContext);


    function creditBtnHandler() {
        const id = generateRandomId();
        const expense = {
            id: id,
            amount: amount,
            date: date,
            description: description,
            type: "credit",
        }
        addExpense(expense);
        console.log(date, amount, description, id);
        setAmount('');
        setDescription('');
    }
    function getDate(date: string) {
        setDate(date);
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.moneyContainer}>
                <View style={styles.amountContainer}>
                    <Text style={styles.label}>Money</Text>
                    <TextInput
                        style={styles.input}
                        cursorColor={Colors.text}
                        keyboardType='decimal-pad'
                        value={amount}
                        onChangeText={(text) => (setAmount(text))}
                    />
                </View>
                <View style={styles.dateContainer}>
                    <Text style={styles.label}>Choose Date</Text>
                    <DatePicker getDate={getDate} />
                </View>
            </View>
            <View>
                <Text style={styles.label}>From Where?</Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    numberOfLines={2}
                    cursorColor={Colors.text}
                    value={description}
                    onChangeText={(text) => (setDescription(text))}
                />
            </View>

            <Button onPress={creditBtnHandler} isActive={true} customStyles={styles.customStyle}>Add Credit</Button>

        </View>
    )
}
export default CreditForm;

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 13
    },
    moneyContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: 5
    },
    amountContainer: {
        flex: 1
    },
    dateContainer: {
        flex: 1
    },
    label: {
        color: Colors.text,
        fontSize: 18
    },
    input: {
        backgroundColor: Colors.secondary200,
        marginVertical: 7,
        marginHorizontal: 2,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: Colors.text,
        color: Colors.white,
        paddingLeft: 6,
        fontSize: 18,
        paddingVertical: 9,
    },
    customStyle: {
        width: '50%',
        margin: 'auto',
        marginTop: 12
    }
})