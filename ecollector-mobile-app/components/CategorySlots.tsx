import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native"


interface categorySlotProps {
    key : number
    tabName: string
    style?: ViewStyle
    isSelected?: boolean
    onTabPress: () => void
}

export default function CategorySlot({ tabName, style, isSelected, onTabPress} : categorySlotProps) {
    
    return (
        <TouchableOpacity style={[style, styles.baseTabStyle, isSelected ? styles.isSelectedTabStyle : styles.baseTabStyle]}
        onPress={onTabPress} activeOpacity={0.7}>
            <Text style={isSelected ? {color: '#0E9D03'} : {color: '#D9D9D9'}}>{tabName}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tabsContainerStyle: {
        width: '80%',
        height: 40,
        flexDirection: 'row',
    },
    baseTabStyle: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#D9D9D9'
    },
    isSelectedTabStyle: {
        borderColor: '#0E9D03'
    }
})