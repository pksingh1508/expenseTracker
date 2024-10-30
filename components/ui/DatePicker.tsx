import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import { DateFormatter } from '../../utils/DateFormatter';
import { Colors } from '../../constants/colors';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export const DatePicker = ({ getDate }: { getDate: (date: string) => void }) => {
    const [date, setDate] = useState(new Date());
    const [currentDate, setCurrentDate] = useState(DateFormatter(new Date()));
    const [show, setShow] = useState(false);

    const onChange = (selectedDate: any) => {
        const currentDate = DateFormatter(new Date(selectedDate.nativeEvent.timestamp));
        setShow(false);
        setCurrentDate(currentDate);
    };

    useEffect(() => {
        getDate(currentDate);
    }, [currentDate])

    const showMode = () => {
        setDate(new Date());
        setShow(true);
    };

    const showDatepicker = () => {
        showMode();
    };

    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                cursorColor={Colors.secondary200}
                value={currentDate}
                onPress={showDatepicker}

            />
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    onChange={onChange}
                    maximumDate={new Date()}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
    }
})