import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface meMenuItemProps {
    icon?: React.ReactElement
    children: ReactNode
    subtitle?: string
    onPress?: () => void
}


export default function MeMenuItem({ icon, children, subtitle, onPress} : meMenuItemProps) {
    return (
        <TouchableOpacity style={styles.menuItemStyle} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.iconStyle}>{icon}</View>
            <View>
                <Text style={styles.titleStyle}>{children}</Text>
                <Text style={styles.subtitleStyle}>{subtitle}</Text>
            </View>
            <View style={styles.arrowStyle}>
                <MaterialIcons name="keyboard-arrow-right" size={25} color="#0E9D03" />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    menuItemStyle: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    iconStyle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(14, 157, 3, 0.1)',
        borderRadius: '100%',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'

    },
    titleStyle: {
        color: '#323232',
        fontWeight: 'bold',
        fontSize: 14
    },
    subtitleStyle: {
        color: '#D9D9D9',
        fontSize: 14
    },
    arrowStyle: {
        position: 'absolute',
        right: 5
    }

})