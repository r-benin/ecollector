import { month } from '@/app/(tabs)/history';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { year } from './TransactionList';

interface dateSelectProps {
    style?: ViewStyle
    selectedMonth: month
    selectedYear: year
    setSelectedMonth: (value: month) => void
    setSelectedYear: (value: year) => void
}

export default function DateSelect({ style, selectedMonth, selectedYear, setSelectedMonth, setSelectedYear} : dateSelectProps) {

    return (
        <View style={[style, styles.dateSelectStyle]}>
            <View style={[styles.pickerContainerBaseStyle, styles.yearPickerStyle]}>
                <Picker selectedValue={selectedYear} onValueChange={
                (itemValue, itemIndex) => setSelectedYear(itemValue)}
                style={styles.pickerBaseStyle} dropdownIconColor={'#0E9D03'}
                >
                    <Picker.Item label='2025' value='2025' />
                    <Picker.Item label='2024' value='2024' />
                    <Picker.Item label='2023' value='2023' />
                    <Picker.Item label='2022' value='2022' />
                    <Picker.Item label='2021' value='2021' />                    
                </Picker>
            </View>
            <View style={[styles.pickerContainerBaseStyle, styles.monthPickerStyle]}>
                <Picker selectedValue={selectedMonth} onValueChange={
                (itemValue, itemIndex) => setSelectedMonth(itemValue)}
                style={styles.pickerBaseStyle} dropdownIconColor={'#0E9D03'}>
                    <Picker.Item label='All months' value='all'/>
                    <Picker.Item label='January' value='january' />
                    <Picker.Item label='February' value='february' />
                    <Picker.Item label='March' value='march' />
                    <Picker.Item label='April' value='april' />
                    <Picker.Item label='May' value='may' />
                    <Picker.Item label='June' value='june' />
                    <Picker.Item label='July' value='july' />
                    <Picker.Item label='August' value='august' />
                    <Picker.Item label='September' value='september' />
                    <Picker.Item label='October' value='october' />
                    <Picker.Item label='November' value='november' />
                    <Picker.Item label='December' value='december' />
                </Picker>
            </View>
        </View>

        )
}

const styles = StyleSheet.create({
    dateSelectStyle: {
        width: '100%',
        flexDirection: 'row'
    },
    pickerContainerBaseStyle: {
        width: '50%',
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderTopWidth: 0,
    },
    pickerBaseStyle: {
        color: '#0E9D03',
    },
    yearPickerStyle: {
        borderRightWidth: 1
    },
    monthPickerStyle: {
        borderLeftWidth: 0,
    },
})