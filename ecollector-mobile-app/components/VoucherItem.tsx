import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import storage from '@react-native-firebase/storage';
import { useState } from 'react';

interface VoucherItemProps {
    voucherId: string
    name: string,
    icon: string,
    expiryDate: Date,
    setVoucherQRVisible: React.Dispatch<React.SetStateAction<{visible: boolean, voucherId: string | null}>>
}

export default function VoucherItem({ voucherId, name, icon, expiryDate, setVoucherQRVisible } : VoucherItemProps) {
    
    const [iconRef, setIconRef] = useState<string>()

    async function fetchIcon() {
        await storage().ref(`/ecollector_assets/rewards/${icon}`)
            .getDownloadURL().then((url) => setIconRef(url))
    }
    
    if (!iconRef) {
        fetchIcon()
    }
    
    function formatDate(date: any) {
        return date.toDate().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            timeZone: 'Asia/Singapore'
        })
    }

    return (
        <View style={styles.rewardsListItemStyle}>
            <View style={styles.iconContainerStyle}>
            { iconRef && <Image source={{uri: iconRef}} style={styles.iconStyle} /> }
            </View>
            <View style={{maxWidth: '50%'}}>
                <Text style={styles.nameStyle} numberOfLines={2}>{name} Voucher</Text>
                <Text style={styles.expiryDateStyle} numberOfLines={2}>Expires on {formatDate(expiryDate)}</Text>
            </View>
            <TouchableOpacity style={styles.QRStyle} onPress={() => setVoucherQRVisible({visible: true, voucherId: voucherId})}>
                <MaterialIcons name="qr-code" size={30} color="#323232" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    rewardsListItemStyle: {
        width: '100%',
        height: 72,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: '8%'
    },
    iconContainerStyle: {
        width: 50,
        height: 60,
        marginRight: 15,
    },
    iconStyle: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
    nameStyle: {
        fontWeight: 'bold',
        color: '#323232'
    },
    expiryDateStyle: {
        color: '#D9D9D9'
    },
    QRStyle: {
        position: 'absolute',
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        justifyContent: 'center',
        alignItems: 'center'
    }
})