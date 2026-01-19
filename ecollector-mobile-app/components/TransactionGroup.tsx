import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { month, year } from "./TransactionList";

interface transactionGroupProps {
    year: year
    month: month
    children: ReactNode
}

function getMonth(month: month) {
    return `${month[0].toUpperCase()}${month.slice(1)}`
}

export default function TransanctionGroup({ year, month, children } : transactionGroupProps) {
    return (
        <View style={styles.transactionGroupStyle}>
            <Text style={styles.textBaseStyle}>
                <Text style={{fontWeight: 'bold'}}>{getMonth(month)}</Text> {year}
            </Text>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    transactionGroupStyle: {
        width: '100%',
        height: 'auto',
        marginBottom: 20
    },
    textBaseStyle: {
        color: '#0E9D03',
        fontSize: 16
    }
})