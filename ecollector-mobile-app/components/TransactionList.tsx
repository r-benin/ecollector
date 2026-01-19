import { View, ViewStyle } from 'react-native'
import TransactionItem, { transactionItemProps } from './TransactionItem'

interface TransactionListProps {
    style?: ViewStyle
    transactionReference: transactionItemProps[]
    filter?: transactionFilter
}

type transactionFilter = {
    year?: year
    month?: month
    category?: category
}

export type category = 'deposit' | 'redeem' | 'all'

export type month =
        'all'
        | 'january'
        | 'february'
        | 'march'
        | 'april'
        | 'may'
        | 'june'
        | 'july'
        | 'august'
        | 'september'
        | 'october'
        | 'november'
        | 'december'

export type year = '2025' | '2024' | '2023' |'2022' | '2021'
    

function filterTransactions( transactionReference : transactionItemProps[], { year, month, category } : transactionFilter) {
    // Display by category
    let filteredTransactions: transactionItemProps[] = transactionReference.filter(
        (transaction) => {return transaction.transactionType.toLowerCase() === category}
    )

    return filteredTransactions
}

export default function TransactionList({ style, transactionReference, filter } : TransactionListProps) {

    let filteredTransactions = filter?.category == 'deposit' ||  filter?.category == 'redeem' ? filterTransactions(transactionReference, filter) : transactionReference

    return (
        <View style={[{minWidth: 300}, style]}>
            {   
            filteredTransactions.map((transaction, index) => {
                return (
                    <TransactionItem
                        key={index}
                        {...transaction}
                        onPress={() => {}}
                        isLast={index == transactionReference.length - 1 ? true : false}
                    />
                )
            })}
        </View>
    )
    
}

