import { Image } from "expo-image";
import { ScrollView, StyleSheet, Text, View } from "react-native";



export default function CollectionGuide() {

    return (
        <ScrollView style={styles.guideContainerStyle} contentContainerStyle={{alignItems: 'center', paddingBottom: '10%'}}>
            <Text style={styles.titleStyle}>Household Collections</Text>
            <View style={{width: '85%', alignItems: 'center'}}>
                <Image source={require('../assets/images/guide_1.png')} style={styles.illustrationStyle}/>
                <Text style={styles.subtitleStyle}>Cool the oil</Text>
                <Text style={styles.contentTextStyle}>
                    Let used cooking oil cool completely before handling to avoid burns or spills.
                </Text>
            </View>
            <View style={{width: '85%', alignItems: 'center'}}>
                <Image source={require('../assets/images/guide_2.png')} style={styles.illustrationStyle}/>
                <Text style={styles.subtitleStyle}>Filter and Store</Text>
                <Text style={styles.contentTextStyle}>
                    Pour the cooled oil into a secure, non-breakable container like old plastic bottles or glass jars. Strain out food particles to keep it clean.
                </Text>
            </View>
            <View style={{width: '85%', alignItems: 'center'}}>
                <Image source={require('../assets/images/guide_3.png')} style={styles.illustrationStyle}/>
                <Text style={styles.subtitleStyle}>Schedule your collection</Text>
                <Text style={styles.contentTextStyle}>
                    Open the Ecollector app, go to the Deposit tab, and tap the Request a Household Collection button. Choose your preferred pickup date and confirm.
                </Text>
            </View>
            <View style={{width: '85%', alignItems: 'center'}}>
                <Image source={require('../assets/images/guide_4.png')} style={styles.illustrationStyle}/>
                <Text style={styles.subtitleStyle}>Prepare for Pickup</Text>
                <Text style={styles.contentTextStyle}>
                    Ensure all oil is in containers and ready for collection. Make sure that the contact details provided are available and attended.
                </Text>
            </View>
            <View style={{width: '85%', alignItems: 'center'}}>
                <Image source={require('../assets/images/guide_5.png')} style={styles.illustrationStyle}/>
                <Text style={styles.subtitleStyle}>Collection</Text>
                <Text style={styles.contentTextStyle}>
                    The team will pick up the oil on your scheduled date. Once collected, the status will show as Completed in the app and you will be allowed to request another household collection again.
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    guideContainerStyle: {
        flex: 1,
    },
    titleStyle: {
        color: '#0E9D03',
        fontSize: 20,
        width: '85%',
        fontWeight: 500,
        textAlign: 'center',
        marginTop: 30
    },
    illustrationStyle: {
        width: 250,
        height: 250
    },
    subtitleStyle: {
        color: '#0E9D03',
        marginBottom: 5,
        fontSize: 16,
        width: '100%',
        textAlign: 'left'
    },
    contentTextStyle: {
        color: '#323232',
        fontSize: 12,
        width: '100%',
        textAlign: 'justify',
        marginBottom: '10%'
    }
})

