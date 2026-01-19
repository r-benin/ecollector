import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { PermissionsAndroid, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

// const collectionPointLocations = [
//     {title: '3S Center Marulas', description: 'Collection Point', coordinates: {latitude: 14.674876659018981, longitude: 120.98298489955475}},
//     {title: '3S Center Gen T. De Leon', description: 'Collection Point', coordinates: {latitude: 14.686889173772624, longitude: 120.9907907837447}},
//     {title: '3S Center Maysan', description: 'Collection Point', coordinates: {latitude: 14.699792702857122, longitude: 120.97784394511294}},
//     {title: '3S Center Karuhatan', description: 'Collection Point', coordinates: {latitude: 14.690519621062085, longitude: 120.9783017632693}},
// ]

export default function CollectionMap() {
    
    const [collectionPoints, setCollectionPoints] = useState<any[] | null>(null)

    useEffect(() => {
        const collectionPointSubscriber = firestore()
            .collection('ecollector_collection_points')
            .onSnapshot((snapshot) => {
                let collectionPointsArray: any[] = []
                snapshot.forEach((point) => {
                    if (point.data().status === 'Active') {
                        collectionPointsArray.push({
                            ...point.data(),
                            coordinates: {latitude: point.data().coordinates.latitude, longitude: point.data().coordinates.longitude}
                        })
                    }
                })
                setCollectionPoints(collectionPointsArray)
            })
    }, [])
    
    
    return (
        <View style={styles.mapContainerStyle}>
            <MapView style={styles.mapStyle} provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 14.67905870159817,
                    longitude: 120.98307441444432,
                    latitudeDelta: 1,
                    longitudeDelta : 1
                }}
                minZoomLevel={15}
                showsUserLocation={true}
                followsUserLocation={true}
                onMapReady={() => {
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                }}
            >
                {collectionPoints ? collectionPoints.map((collectionPoint, index) => {
                    return (
                        <Marker title={collectionPoint.name} description={collectionPoint.description} coordinate={collectionPoint.coordinates} key={index} />
                    )
                }) : null}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    mapContainerStyle: {
        flex: 1
    },
    mapStyle: {
        width: '100%',
        height: '100%'
    },
})

