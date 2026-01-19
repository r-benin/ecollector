import storage from '@react-native-firebase/storage'
import { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { reward } from './RewardsList'

export default function RewardsListItem({ name, cost, icon, onPress } : reward & TouchableOpacityProps) {
    const [iconRef, setIconRef] = useState<string>()

    async function fetchIcon() {
        await storage().ref(`/ecollector_assets/rewards/${icon}`)
            .getDownloadURL().then((url) => setIconRef(url))
    }
    

    // useEffect that sets iconRef
    useEffect(() => {
        fetchIcon()
    }, [name])
    
    return (
        <TouchableOpacity style={styles.rewardsListItemStyle} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.iconContainerStyle}>
            { iconRef && <Image source={{uri: iconRef}} style={styles.iconStyle} />}
            </View>
            <Text style={styles.nameStyle} numberOfLines={2}>{name}</Text>
            <View style={styles.costContainerStyle}>
                <Image source={require('../assets/images/ecollector-credit-icon.png')}
                    style={{width: 14, resizeMode:'contain', marginRight: 3}}
                />
                <Text style={styles.costTextStyle}>{cost}</Text>
            </View>
        </TouchableOpacity>
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
        maxWidth: '50%',
        fontWeight: 'bold',
        color: '#323232'
    },
    costContainerStyle: {
        position: 'absolute',
        right: '10%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    costTextStyle: {
        color: '#0E9D03',
        fontSize: 16,
        fontWeight: 'bold'
    }
})