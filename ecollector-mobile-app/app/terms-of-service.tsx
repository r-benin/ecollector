import { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function TermsOfService() {
    const [accordionIndex, setAccordionindex] = useState<number | null>(null)

    return (
        <ScrollView contentContainerStyle={styles.termsOfServiceContainerStyle} scrollEnabled={true}>
            <Text style={styles.titleStyle}>Terms of Service</Text>
            <Text style={styles.contentStyle}>
                These terms of Service govern your use of the Ecollector mobile application. By accessing or using the app, you agree to be bound by these terms and our <Text style={{fontWeight: 'bold'}}>Privacy Policy</Text>. If you do not agree to these terms, do not use the app.
            </Text>
            <Text style={[styles.subtitleStyle, {marginTop: 10}]}>Description of Service</Text>
            <Text style={[styles.contentStyle]}>
                The app provides a service to facilitate the collection of used cooking oil through household collections or collection points. 
            </Text>
            <Text style={[styles.subtitleStyle, {marginTop: 10}]}>User Responsibilities</Text>
            <Text style={[styles.contentStyle]}>
                You agree to use the app and the collection service responsibly and in accordance with our guidelines. This includes:
            </Text>
            <Text style={[styles.contentStyle, {paddingLeft: 20}]}>
                <Text style={{fontWeight: 'bold'}}>Accurate Information: </Text>
                Providing accurate and complete information when creating your account and scheduling a collection, including your name, contact information, and collection address.
            </Text>
            <Text style={[styles.contentStyle, {paddingLeft: 20}]}>
                <Text style={{fontWeight: 'bold'}}>Proper Preparation: </Text>
                Preparing your used cooking oil for collection according to the <Text style={{fontWeight: 'bold'}}>"Household Collection Guide"</Text> provided in the app. This includes using a secure, non-breakable container and ensuring the oil is free from water, food scraps, and other contaminants.
            </Text>
            <Text style={[styles.contentStyle, {paddingLeft: 20}]}>
                <Text style={{fontWeight: 'bold'}}>Acceptable Use: </Text>
                Using the app solely for its intended purpose to book collections of used cooking oil. You may not use the app for any illegal or unauthorized activities.
            </Text>
            <Text style={[styles.subtitleStyle, {marginTop: 10}]}>Intellectual Property</Text>
            <Text style={[styles.contentStyle]}>
                The app, including all its content, features, and functionality (such as text, graphics, logos, and software), is the exclusive property of <Text style={{fontWeight: 'bold'}}>Ecollector</Text> and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any part of the app without our express written permission.
            </Text>
            <Text style={[styles.subtitleStyle, {marginTop: 10}]}>Disclaimers and Limitation of Liability</Text>
            <Text style={[styles.contentStyle]}>
                The app and its services are provided on an "as-is" and "as-available" basis. We do not guarantee that the app will be uninterrupted, error-free, or secure.
            </Text>
            <Text style={[styles.contentStyle, {paddingLeft: 20}]}>
                <Text style={{fontWeight: 'bold'}}>Limitation of Liability: </Text>
                To the maximum extent permitted by law, <Text style={{fontWeight: 'bold'}}>Ecollector</Text> will not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of the app or the inability to use the app, even if we have been advised of the possibility of such damages.
            </Text>
            <Text style={[styles.contentStyle, {paddingLeft: 20}]}>
                <Text style={{fontWeight: 'bold'}}>Service Availability: </Text>
                While we strive to provide reliable collection services, we are not liable for any delays or failures in collection due to unforeseen circumstances, including but not limited to, traffic, weather, or other events beyond our reasonable control.
            </Text>
            <Text style={[styles.subtitleStyle, {marginTop: 10}]}>Termination</Text>
            <Text style={[styles.contentStyle]}>
                We reserve the right to suspend or terminate your account and access to the app at our sole discretion, without prior notice or liability, for any reason, including if you breach these terms.
            </Text>
            <Text style={[styles.subtitleStyle, {marginTop: 10}]}>Changes to Terms</Text>
            <Text style={[styles.contentStyle]}>
                We may update these terms from time to time. Your continued use of the app after any changes to the terms will constitute your acceptance of the updated terms.
            </Text>
            <Text style={[styles.subtitleStyle, {marginTop: 10}]}>Contact Information</Text>
            <Text style={[styles.contentStyle]}>
                If you have any questions about these terms, please contact us at <Text style={{fontWeight: 'bold'}}>inquiries@ecollector.com</Text>
            </Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    termsOfServiceContainerStyle: {
        alignItems: 'center',
        paddingTop: '7%',
        paddingBottom: '10%'
    },
    titleStyle: {
      color: '#323232',
      fontSize: 24,
      fontWeight: 'bold',
      width: '85%',
      marginBottom: 5
    },
    subtitleStyle: {
      color: '#323232',
      fontSize: 16,
      fontWeight: 'bold',
      width: '85%',
      marginBottom: 5
    },
    contentStyle: {
      color: '#323232',
      fontSize: 14,
      width: '85%',
      textAlign: 'justify',
      marginBottom: 10
    }
})

