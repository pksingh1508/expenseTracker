import { View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function BottomIcons({ icon, color, size }: any) {
    return (
        <View style={{ width: 150, height: 100, margin: 'auto', alignItems: 'baseline', justifyContent: 'center' }}>
            <MaterialCommunityIcons name={icon} color={color} size={size} />
        </View>
    )
}

export default BottomIcons;