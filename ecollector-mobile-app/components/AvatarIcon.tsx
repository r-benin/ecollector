import { fullName } from "@/app/(tabs)/home";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getInitials } from "./ProfileBanner";


interface avatarIconProps {
    avatar?: string
    size?: number,
    children?: ReactNode,
    name: fullName,
    backgroundColor?: 'white' | 'green'
    
}


export default function AvatarIcon({ avatar , size, children, name, backgroundColor = 'white' } : avatarIconProps ) {
    const defaultSize = {
        width: 25,
        height: 25
    }
    return (
        <View style={[styles.avatarStyle, size ? {width: size, height: size} : defaultSize, backgroundColor === 'green' ? {backgroundColor: 'rgba(14, 157, 3, 0.15)'} : {backgroundColor: 'white'}]}>
            {avatar ? children : <Text style={styles.initialsStyle}>{getInitials(name)}</Text>}
        </View>
    )
}


const styles = StyleSheet.create({
    avatarStyle: {
        height: 'auto',
        color: '#0E9D03',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%'
    },
    initialsStyle: {
        fontSize: 40,
        color: '#0E9D03',
        fontWeight: 'light'
    }
})