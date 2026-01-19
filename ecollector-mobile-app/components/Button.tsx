import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'

interface ButtonProps {
    text: string,
    textColor?: string,
    textSize?: number
    preset?: 'solid' | 'outline',
    onPress?: () => void,
    buttonColor?: string
    width?: number | `${number}%`
    height?: number,
    style?: ViewStyle
    icon?: React.ReactNode,
    disabled?: boolean,
}

export default function Button({text, textColor = 'white', textSize = 18, preset = 'solid', onPress, buttonColor = '#0E9D03', width = 150, height = 50, style, icon, disabled} : ButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} style={[{width: width}, disabled ? {opacity: 0.5} : null]} disabled={disabled} activeOpacity={0.7}>
            <View style={[
                styles.buttonBaseStyle,
                preset == 'outline' ? styles.buttonOutline : styles.buttonSolid,
                preset == 'solid' ? {backgroundColor: buttonColor} : {borderColor: buttonColor},
                { width: '100%' }, {height: height}, style
            ]
            }>
                {icon}
                <Text style={[{fontSize: textSize, color: textColor}]}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonBaseStyle: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
    },
    buttonOutline: {
        borderWidth: 1
    },
    buttonSolid: {

    }
})