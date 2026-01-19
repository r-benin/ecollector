import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Text, View } from 'react-native';

interface householdCollectionsProps  {
    status: 'pending' | 'ongoing' | 'rejected' | 'completed' | 'cancelled' | null | string
    date: Date | null
}

export default function StatusLabel({status, date} : householdCollectionsProps) {
    let statusColor = ''
    let progressA = ''
    let progressB = ''
    let progressC = ''
    let icon = <></>

    function formatDate(date: Date) {
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            day: 'numeric',
            month: 'long',
            timeZone: 'Asia/Singapore'
        })
        const weekday = date.toLocaleDateString('en-US', {
            weekday: 'long',
            timeZone: 'Asia/Singapore'
        })
        return `${formattedDate} (${weekday})`
    }

    switch (status) {
        case 'pending':
            statusColor = '#0E9D03'
            progressA = '#0E9D03'
            progressB = '#0E9D0333'
            progressC = '#E9E9E9'
            icon = <MaterialIcons name="pending-actions" size={40} color="#0E9D03" />
        break

        case 'cancelled':
            statusColor = '#858585'
            progressA = '#E9E9E9'
            progressB = '#E9E9E9'
            progressC = '#E9E9E9'
            icon = <MaterialCommunityIcons name="calendar-remove" size={40} color="#858585" />
        break

        case 'ongoing':
            statusColor = '#0E9D03'
            progressA = '#0E9D03'
            progressB = '#0E9D03'
            progressC = '#0E9D0333'
            icon = <MaterialCommunityIcons name="truck-delivery-outline" size={40} color="#0E9D03" />
        break

        case 'rejected':
            statusColor = '#E33629'
            progressA = '#E33629'
            progressB = '#E33629'
            progressC = '#E33629'
            icon = <MaterialIcons name="cancel" size={40} color="#E33629" />
        break

        case 'completed':
            statusColor = '#0E9D03'
            progressA = '#0E9D03'
            progressB = '#0E9D03'
            progressC = '#0E9D03'
            icon = <MaterialIcons name="check-circle" size={40} color="#0E9D03" />
        break
    }
    
    return (
        <View style={{alignItems: 'center', width: '100%'}}>
            <View style={{width: '97%', marginBottom: 10, alignItems: 'center'}}>
                <Text style={{color: '#323232', fontSize: 14, fontWeight: 'bold', width: '100%'}}>{date ? formatDate(date) : null}</Text>
            </View>
            <View style={{width: '100%', height: 69, flexDirection: 'row',}}>
                <View style={{marginRight: 10, height: 60}}>
                    <View style={[styles.statusIconStyle, {backgroundColor: `${statusColor}1A`}]}>
                        {icon}
                    </View>
                </View>
                <View style={{width: '80%', height: 60}}>
                    <View style={{height: '50%', justifyContent: 'flex-end'}}>
                        <Text style={{fontSize: 14, color: `${statusColor}`}}>
                            {   status === 'pending' ? 
                                'Pending' :
                                status === 'ongoing' ?
                                'Ongoing' :
                                status === 'rejected' ?
                                'Rejected' :
                                status === 'completed' ?
                                'Completed' :
                                status === 'cancelled' ?
                                'Cancelled' :
                                null
                            }
                        </Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 12, fontWeight: 'semibold', color: '#323232'}}>
                            {   status === 'pending' ? 
                                'Waiting for approval' :
                                status === 'ongoing' ?
                                'Request approved, please await collection':
                                status === 'rejected' ?
                                'Request denied, try another date':
                                status === 'completed' ?
                                'Collection successful!':
                                status === 'cancelled' ?
                                'Collection has been cancelled':
                                null
                            }
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{height: 5, width: '98%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width: '32.5%', borderRadius: 100, backgroundColor: `${progressA}`}} />
                <View style={{width: '32.5%', borderRadius: 100, backgroundColor: `${progressB}`}} />
                <View style={{width: '32.5%', borderRadius: 100, backgroundColor: `${progressC}`}} />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    statusIconStyle: {
        width: 60,
        height: 60,
        borderRadius: 1000,
        alignItems: 'center',
        justifyContent: 'center'
    }
})