import { Image, StyleSheet, Text, View } from 'react-native';

interface rewardsCreditsProps {
    credits: number
}

function getDate() {
    const now = new Date()
    const formattedDate = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return `${formattedDate}`
}

export default function RewardsCredits({ credits } : rewardsCreditsProps) {
    
    return(
        <View style={styles.rewardsCreditsStyle}>
            <Text style={[styles.creditTextBaseStyle]}>As of {getDate()}, you have </Text>
            <Image source={require('../assets/images/ecollector-credit-icon.png')} style={{height: 15, resizeMode: 'contain', width: 10}} />
            <Text style={[styles.creditTextBaseStyle, styles.creditTextStyle]}> {new Intl.NumberFormat().format(credits)}</Text>
            <Text style={styles.creditTextBaseStyle}>  to spend</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    rewardsCreditsStyle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#D9D9D9',
        height: 40,
        marginBottom: 20
    },
    creditTextBaseStyle: {
        color: '#0E9D03',
        fontSize: 12,
    },
    creditTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})