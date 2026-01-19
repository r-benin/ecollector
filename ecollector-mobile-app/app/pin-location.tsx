import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { TransactionsContext } from "./_layout";

export default function PinLocation({pinCoordinates} : {pinCoordinates: {
        latitude: number,
        longitude: number,
        latitudeDelta: number,
        longitudeDelta : number
    }}) {

    const router = useRouter()
    
    const { pinLocation, setPinLocation } = useContext(TransactionsContext)


    const [center, setCenter] = useState({
        latitude: 14.67905870159817,
        longitude: 120.98307441444432,
        latitudeDelta: 1,
        longitudeDelta : 1
    })
    
    function handleSetPin(location: any) {
        setPinLocation({latitude: location.latitude, longitude: location.longitude})
        router.back()
    }

    return (
        <View style={styles.mapContainerStyle}>
            <MapView style={styles.mapStyle} provider={PROVIDER_GOOGLE}
                initialRegion={center}
                minZoomLevel={15}
                showsUserLocation={true}
                followsUserLocation={true}
                onRegionChange={region => setCenter(region)}
            >
                <Marker coordinate={center} />
            </MapView>
            <View style={styles.buttonContainerStyle}>
                <Button text={'Set pin location'} width={'90%'} textSize={20} onPress={() => {handleSetPin(center)}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mapContainerStyle: {
        flex: 1,
        alignItems: 'center',
    },
    mapStyle: {
        width: '100%',
        height: '100%'
    },
    buttonContainerStyle: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 100,
        bottom: '6%'
    }
})

