import { Pressable, StyleSheet, Text, View } from "react-native";
import { Expense } from "../../store/ExpenseContext";
import { Colors } from "../../constants/colors";


const ExpenseList = ({ data, onPress }: { data: Expense, onPress: (id: string) => void }) => {
    const types = data.type;
    return (
        <Pressable style={styles.mainContainer} onLongPress={onPress.bind(this, data.id)}>
            <View>
                <Text style={styles.text}>{data.description}</Text>
                <Text style={styles.date}>{data.date}</Text>
            </View>
            <View style={styles.amountContainer}>
                {types === 'expense' ? (
                    <Text style={styles.expenseText}>{'- ₹'}{data.amount}</Text>
                ) : (
                    <Text style={styles.creditText}>{'+ ₹'}{data.amount}</Text>
                )}
            </View>
        </Pressable>
    )
}
export default ExpenseList;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.primary300,
        borderWidth: 1,
        borderColor: Colors.text,
        elevation: 4,
        marginHorizontal: 8,
        borderRadius: 9,
        paddingHorizontal: 5,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginVertical: 4
    },
    text: {
        color: Colors.secondaryText,
        fontSize: 19,
        fontWeight: 'bold'
    },
    date: {
        color: Colors.secondaryText,
        fontSize: 15,
        fontWeight: 'semibold'
    },
    amountContainer: {
        backgroundColor: Colors.white,
        width: 100,
        height: 50,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    expenseText: {
        fontSize: 17,
        color: 'red'
    },
    creditText: {
        fontSize: 17,
        color: 'green'
    }
})