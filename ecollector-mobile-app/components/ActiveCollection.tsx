import { Alert, StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import Card from './Card';
import StatusLabel from './StatusLabel';

import firestore from '@react-native-firebase/firestore';


export type collectionDataType = {
    collectionID: string | null,
    date: Date | null,
    status: 'pending' | 'ongoing' | 'rejected' | 'completed' | 'cancelled' | null
}

export function ActiveCollection({ collectionID, date, status, showQR } : collectionDataType & {showQR: React.Dispatch<React.SetStateAction<boolean>>}) {

    async function cancelRequest() {
        const newDate = new Date()
        const fullDate = newDate.toLocaleDateString('en-US', {
            year: 'numeric',
            day: 'numeric',
            month: 'long',
            timeZone: 'Asia/Singapore'
        })
        try {
            await firestore().collection('ecollector_requests')
            .doc(`${collectionID}`)
            .update({status: 'cancelled', note: `Cancelled by user on ${fullDate}`})
        } catch (error) {
            Alert.alert('Error updating database! Please try again later.', `${error}`)
        }
    }
    
    function cancelRequestAlert() {
        Alert.alert(
            'Cancel request',
            'Are you sure you want to cancel your request',
            [
                {
                    text: 'Confirm',
                    onPress: () => cancelRequest(),
                    style: 'destructive',
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            {
            cancelable: true,
            },
        );
    }

    return (
        <View style={{width: '85%'}}>
            <Text style={{color: '#0E9D03', marginBottom: 10, fontSize: 16}}>Active Household Collection</Text>
            <View style={[styles.householdCollectionsStyle, status === 'ongoing' ? {height: 225} : status === 'pending' ? {height: 185} : {height: 140}]}>
                <Card style={styles.cardStyle}>
                    { collectionID ? <StatusLabel status={status} date={date}/> :
                        <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: '#D9D9D9'}} >You have no active collections</Text>
                        </View>
                    }
                    { status === 'ongoing' ? 
                        <Button text={'Show QR Code'} width={'100%'} height={35} textSize={14} style={{marginTop: 15}}
                        onPress={() => {showQR(true)}}/> : null
                    }
                    { status === 'cancelled' || status === 'rejected' || status === 'completed' || status === null ? 
                        null : <Button text={'Cancel'} width={'100%'} height={35} textSize={14} style={{marginTop: status === 'pending' ? 15 : 7}}
                        onPress={() => cancelRequestAlert()} preset='solid' buttonColor='rgba(14, 157, 3, 0.15)' textColor='#0E9D03'/>
                    }
                </Card>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    householdCollectionsStyle: {
        width: '100%',
    },
    cardStyle: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    collectionItemStyle: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems: 'center',
    },
    collectionItemTextStyle: {
        color: '#323232',
        fontWeight: 'bold'
    }
})