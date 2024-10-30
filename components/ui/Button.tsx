import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";


function Button({ children, onPress, isActive, customStyles }: { children: string, onPress: () => void, isActive: boolean, customStyles: {} }) {
    return (
        <Pressable style={({ pressed }) => ([styles.container, customStyles, pressed && styles.pressed])} onPress={onPress}>
            <Text style={[isActive ? styles.text : styles.activeText]}>{children}</Text>
        </Pressable>
    )
}
export default Button;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        borderRadius: 5,
        paddingVertical: 9,
        paddingHorizontal: 5,
        elevation: 4,
        borderWidth: 1,
        borderColor: Colors.text,
        backgroundColor: Colors.secondary200,
        overflow: 'hidden',
        alignItems: 'center'
    },
    text: {
        color: Colors.white,
        fontSize: 16
    },
    activeText: {
        color: Colors.text,
        fontSize: 16
    },
    pressed: {
        opacity: 0.7
    }
})