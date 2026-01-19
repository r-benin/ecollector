import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Alert, StyleSheet, View } from "react-native";
import { TransactionsContext } from './_layout';


export default function QRScanner() {
    
    const [permission, requestPermission] = useCameraPermissions()
    const [scanned, setScanned] = useState(false)
    const router = useRouter()
    const { setQRScanned, QRScanned } = useContext(TransactionsContext)
    
    function handleQRScanned(result: any) {
        console.log('QR SCANNED: ', result.data)
        setScanned(true)
        setQRScanned(result.data)
        router.back()
    }

    if (!permission) {
        return (<View />)
    }

    if (!permission.granted) {
        Alert.alert('Grant camera acess', 'Please allow camera acess for the utilize this feature.', [
            {
                text: 'Allow',
                onPress: requestPermission
            },
            {
                text: 'Deny',
                onPress: () => router.push('/admin-controls')
            }
        ])
    }
    
    return (
        <View style={styles.adminControlsContainerStyle}>
            <CameraView
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={scanned ? undefined : handleQRScanned}
                style={{flex: 1}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    adminControlsContainerStyle: {
        flex: 1
    },
})

