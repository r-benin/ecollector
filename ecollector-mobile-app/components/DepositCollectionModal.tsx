import { TransactionsContext } from '@/app/_layout';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Alert, Modal, PermissionsAndroid, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Button from './Button';

import firestore, { GeoPoint, Timestamp } from '@react-native-firebase/firestore';

interface CollectionModalType {
    onRequestClose: () => void
    visible: boolean
}

export default function CollectionModal({ onRequestClose, visible } : CollectionModalType) {
    
    const { user, userData, pinLocation, setPinLocation } = useContext(TransactionsContext)
    const [collectionDate, setCollectionDate] = useState<Date | null>(null)
    const [availableDates, setAvailableDates] = useState<Date[] | []>([])
    const [isEnabled, setIsEnabled] = useState<boolean>(true)

    useEffect(() => {
        let collectionDateArray: Date[] = []
        const collectionDates = firestore().collection('ecollector_schedule')
        .doc(userData.address.barangay)
        .get()
        .then((barangay) => {
            const barangayData = barangay.data()
            if (barangayData) {
                const schedule = barangayData.collection_dates
                schedule.sort((a: Timestamp, b: Timestamp) => {
                    a.toDate().getTime() - b.toDate().getTime()
                })
                collectionDateArray = schedule.map((date: Timestamp) => {
                    return date.toDate()
                })
                setAvailableDates(collectionDateArray)
            }
        })
    }, [visible])

    const router = useRouter()

    async function handleSubmit(){
        const collectionRequest = {
            userId: user.uid,
            fullName: `${userData.firstName} ${userData.lastName}`,
            mobileNumber: userData.mobileNumber,
            address: userData.address.street,
            barangay: userData.address.barangay,
            location: new GeoPoint(pinLocation.latitude, pinLocation.longitude),
            status: 'pending',
            note: '',
            collectionDate: collectionDate,
            placedOn: firestore.FieldValue.serverTimestamp()
        }
        try {
            await firestore().collection('ecollector_requests')
            .add(collectionRequest)
            setPinLocation()
            setCollectionDate(null)
            Alert.alert('Succesfully sent a collection request!')
            handleCloseModal()
        } catch (error) {
            Alert.alert('Error sending a request! Please try again later.', `${error}`)
        }
    }

    function handleCloseModal() {
        setPinLocation()
        setCollectionDate(null)
        setIsEnabled(true)
        onRequestClose()
    }

    function getDateLabel(date: Date) {
        const fullDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Asia/Singapore'
        })
        const weekday = date.toLocaleDateString('en-US', {
            weekday: 'long',
            timeZone: 'Asia/Singapore'
        })
        return `${fullDate} (${weekday})`
    }

    return (
        <Modal
            animationType='fade'
            onRequestClose={onRequestClose}
            visible={visible}
            statusBarTranslucent
            transparent
        >
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={styles.collectionModalStyle}>
                    <Text style={styles.modalTitle}>Request Household Collection</Text>
                    <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center'}}>
                        <View style={styles.modalGroupContainer}>
                            <Text style={styles.modalGroupTitle}>Street Address</Text>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder="Enter street address"
                                editable={false}
                                value={userData.address.street}
                            />
                        </View>
                        <View style={styles.modalGroupContainer}>
                            <Text style={styles.modalGroupTitle}>Barangay</Text>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder="Enter barangay"
                                editable={false}
                                value={userData.address.barangay}
                            />
                            <Text style={[styles.noteStyle, {width: '100%'}]}>To change your address details, edit your address details in the Manage Account settings.</Text>
                        </View>
                        <View style={styles.modalGroupContainer}>
                            <Text style={styles.modalGroupTitle}>Pin Location</Text>
                            <MapView style={{width: '100%', height: 200}} provider={PROVIDER_GOOGLE}
                                onMapReady={() => {
                                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                                }}
                                region={pinLocation ?
                                    {
                                        latitude: pinLocation.latitude,
                                        longitude: pinLocation.longitude,
                                        latitudeDelta: 1,
                                        longitudeDelta : 1
                                    } : 
                                    {
                                        latitude: 14.67905870159817,
                                        longitude: 120.98307441444432,
                                        latitudeDelta: 1,
                                        longitudeDelta : 1
                                    }
                                }
                                scrollEnabled={false}
                                minZoomLevel={pinLocation ? 16 : 12}
                                showsUserLocation={true}
                                showsMyLocationButton={false}
                                followsUserLocation={true}
                            >
                                {pinLocation ? <Marker coordinate={{latitude: pinLocation.latitude, longitude: pinLocation.longitude}}/> : null}
                            </MapView>
                            <Button icon={<MaterialIcons name="location-pin" size={24} color="black" />} text={'Select pin location'} preset='outline' width={'100%'} textColor='#323232' buttonColor='#D9D9D9' onPress={() => router.push('/pin-location')}/>
                        </View>

                        <View style={styles.modalGroupContainer}>
                            <Text style={styles.modalGroupTitle}>Available Dates</Text>
                            <View style={{width: '100%', justifyContent: 'center', height: 40, borderWidth: 1, borderRadius: 10, borderColor: '#D9D9D9'}}>
                                <Picker
                                    style={{color: '#323232'}}
                                    dropdownIconColor='#323232'
                                    onValueChange={(date: Date) => setCollectionDate(date)}
                                    onFocus={() => { if (!collectionDate) { setIsEnabled(false) } }}
                                    onBlur={() => { if (!collectionDate && !isEnabled) { setIsEnabled(true) } }}
                                    selectedValue={undefined}
                                    enabled={availableDates.length != 0}
                                >
                                    {
                                        availableDates.length == 0 ? <Picker.Item label={'No available schedule'} value={null} style={{color: '#D9D9D9', fontSize: 14, backgroundColor: 'red'}} enabled={isEnabled}/>
                                        : <Picker.Item label={'Select a schedule'} value={null} style={{color: '#323232', fontSize: 14}} enabled={isEnabled}/>
                                    }
                                    {availableDates.map((item: Date, index) => {return <Picker.Item key={index} label={getDateLabel(item)} value={item} style={{color: '#323232', fontSize: 14}}/>})}
                                </Picker>
                            </View>
                        </View>
                        <Text style={[styles.noteStyle, {width: '85%'}]}>By sending a request, you agree to have read the Household Collection Policy. Ecollector reserves the right to refuse any household collection.</Text>
                        <Button text={'Send request'} width={'85%'} onPress={() => handleSubmit()} disabled={!(pinLocation && collectionDate)} style={{marginTop: 20}}/>
                        <Button text={'Cancel'} width={'85%'} buttonColor='rgba(14, 157, 3, 0.15)' textColor='#0E9D03' onPress={() => handleCloseModal()} style={{marginTop: 10}}/>
                    </ScrollView>
                </View>
                <TouchableWithoutFeedback onPress={() => handleCloseModal()}>
                    <View style={styles.modalBackdrop}>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    collectionModalStyle: {
        paddingBottom: 20,
        width: '90%',
        height: '85%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingTop: '7%',
    },
    modalBackdrop: {
        height: '100%',
        width: '100%',
        opacity: 0.5,
        backgroundColor: 'black',
        zIndex: -1,
        position: 'absolute'
    },
    modalTitle : {
        fontWeight: 'bold',
        color: '#0E9D03',
        fontSize: 20,
        marginBottom: 20
    },
    modalGroupContainer: {
        width: '85%',
        gap: 10,
        marginBottom: 20
    },
    modalGroupTitle: {
        color: '#323232',
        fontWeight: 'bold',
        fontSize: 16
    },
    inputStyle: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D9D9D9',
        paddingLeft: 10,
        color: '#323232'
    },
    noteStyle: {
        color: '#D9D9D9',
    },
    errorText: {
        fontSize: 10,
        color: '#E33629',
        width: 280,
    },
})