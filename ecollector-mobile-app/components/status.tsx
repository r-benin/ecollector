import { StyleSheet, Text, View } from 'react-native'


interface householdCollectionsProps  {
    status: 'Pending' | 'Approved' | 'Declined' | 'Completed' | 'Canceled'
}

export default function HouseholdCollections({status} : householdCollectionsProps) {
    let statusColor = ''
    let statusMargin = 0
    switch (status) {
        case 'Pending':
            statusColor = '#D3A200'
            statusMargin = 5
        break

        case 'Canceled':
            statusColor = '#D9D9D9'
            statusMargin = 5
        break

        case 'Approved':
            statusColor = '#D3A200'
            statusMargin = 5
        break

        case 'Declined':
            statusColor = '#E33629'
            statusMargin = 5
        break

        case 'Completed':
            statusColor = '#0E9D03'
        break
    }
    
    return (
        <View style={[styles.statusLabelStyle, {backgroundColor: `${statusColor}1A`}]}>
            <View style={[{backgroundColor: statusColor}, styles.statusCircleStyle]}></View>
            <Text style={{color: statusColor, fontSize: 12, marginLeft: statusMargin}}>{status}</Text>
        </View>
    )
}

// #0E9D03
// #0e9d031a

const styles = StyleSheet.create({
    statusLabelStyle: {
        borderWidth: 1,
        width: 95,
        height: 25,
        borderRadius: 95,
        borderColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    statusCircleStyle: {
        width: 10,
        height: 10,
        borderRadius: '100%',
        marginRight: 5,
        marginLeft: 10
    }
})