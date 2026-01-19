import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';

type transactionType = {
    transaction: 'deposit' | 'redeem'
}

export default function TransactionIcon({ transaction } : transactionType) {
    return (
        <View style={[styles.transactionItemStyle, transaction.toLowerCase() == 'deposit' ? {backgroundColor: '#0E9D03'} : {backgroundColor: '#E33629'}]}>
            { transaction.toLowerCase() == 'deposit' ? <Ionicons name="water" size={24} color="white" /> : <Feather name="gift" size={24} color="white" />}
        </View>
    )
}

const styles = StyleSheet.create({
    transactionItemStyle: {
        width: 35,
        height: 35,
        borderRadius: 100,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    }
})