import { StyleSheet, View, ViewStyle } from 'react-native'

interface CardProps {
    children?: React.ReactNode
    style?: ViewStyle | ViewStyle[]
}

export default function Card({ children, style } : CardProps) {
    return (
        <View style={[styles.cardBaseStyle, style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    cardBaseStyle: {
        width: 200,
        height: 100,
        backgroundColor: 'white',
        padding: 15,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        elevation: 3,
    }
})

