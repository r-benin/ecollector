import { Text, View } from 'react-native'

export default function EmptyTransactions() {
    return (
        <View style={{width: '100%', height: 200, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#D9D9D9'}}>You have no transactions.</Text>
        </View>
    )
}