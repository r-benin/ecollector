import { StyleSheet, Text, View } from 'react-native'
import TransactionIcon from './TransactionIcon'

export interface transactionItemProps {
    transactionId: number
    transactionTitle: string
    transactionType: 'deposit' |'redeem'
    transactionDate: Date
    transactionValue: number
}

export default function TransactionItem({transactionId, transactionTitle, transactionType, transactionDate, transactionValue} : transactionItemProps) {
    return (
        <View style={styles.transactionItemStyle}>
            <TransactionIcon transaction={transactionType}></TransactionIcon>
            <View style={{width: 240, marginLeft: 15}}>
                <Text style={{fontWeight: 'bold'}}>{transactionTitle}</Text>
                <Text style={{fontSize: 12, color: '#D9D9D9'}}>{transactionDate.toDateString()}</Text>
            </View>
            <Text style={[styles.transactionValueStyle, transactionType.toLowerCase() == 'deposit' ? transactionValue > 0 ? {color: '#0E9D03'}: {color: '#D9D9D9'} : {color: '#E33629'}]}>
                {transactionType.toLowerCase() == 'deposit' ? transactionValue > 0 ? `+${transactionValue}`: '0' : `-${transactionValue}`}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    transactionItemStyle: {
        width: '100%',
        height: 72,
        flexDirection: 'row',
        alignItems: 'center'
    },
    transactionValueStyle: {
        width: 60,
        textAlign: 'right',
        position: 'absolute',
        right: 5
    }


})

 