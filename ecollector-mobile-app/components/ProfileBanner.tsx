import { fullName } from '@/app/(tabs)/home'
import { StyleSheet, Text, View } from 'react-native'
interface profileBannerProps {
    name: fullName
    avatar?: string
}

export function getInitials(name: fullName) {
    return `${name.firstName[0]}${name.lastName[0]}`
}

export default function ProfileBanner({ name, avatar } : profileBannerProps) {
    return (
        <View style={styles.profileBannerStyle}>
            <View style={styles.profileIconStyle}>
                {!avatar ? <Text style={{color: '#0E9D03', fontSize: 20}}>{getInitials(name)}</Text> : <Text></Text>}
            </View>
            <View>
                <Text style={{fontWeight: 'bold', color: 'white'}}>Hello, {name.firstName}!</Text>
                <Text style={{color: 'white'}}>Ready to recycle?</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profileBannerStyle: {
        width: 300,
        height: 'auto',
        flexDirection: 'row',
        marginTop: '5%'
    },
    profileIconStyle: {
        width: 45,
        height: 45,
        borderRadius: '100%',
        backgroundColor: 'white',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',

    }
})