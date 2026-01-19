import { ScrollView, StyleSheet, Text } from "react-native";

export default function PrivacyPolicy() {

    return (
        <ScrollView contentContainerStyle={styles.privacyPolicyContainerStyle} scrollEnabled={true}>
          <Text style={styles.titleStyle}>Privacy Policy</Text>
          <Text style={styles.contentStyle}>
            This Privacy Policy describes how Ecollector ("we", "us", or "our") collects, uses, and protects your personal information. By using our application, you agree to the terms outlined in this policy.
          </Text>
          <Text style={[styles.subtitleStyle, {marginTop: 10}]}>Information We Collect</Text>
          <Text style={[styles.contentStyle]}>
            We collect the following information to provide and improve our services:
          </Text>
          <Text style={[styles.contentStyle, {paddingLeft: 20}]}>
            <Text style={{fontWeight: 'bold'}}>Account Information: </Text>
            When you create an account, we collect your name, email address, and phone number.
          </Text>
          <Text style={[styles.contentStyle, {paddingLeft: 20}]}>
            <Text style={{fontWeight: 'bold'}}>Collection Information: </Text>
            To facilitate our service, we collect your physical address and contact details for the collection of used cooking oil.
          </Text>
          <Text style={[styles.subtitleStyle, {marginTop: 10}]}>How We Use Your Information</Text>
          <Text style={[styles.contentStyle]}>
            Your information is used exclusively to support the app's core functions:
          </Text>
          <Text style={[styles.contentStyle, {paddingLeft: 20}]}>
            <Text style={{fontWeight: 'bold'}}>Household Collection: </Text>
            We use your address and contact details to schedule and complete your used cooking oil collections.
          </Text>
          <Text style={[styles.contentStyle, {paddingLeft: 20}]}>
            <Text style={{fontWeight: 'bold'}}>Communication: </Text>
            We may use your contact information to send you essential service-related notifications, such as booking confirmations and reminders.
          </Text>
          <Text style={[styles.subtitleStyle, {marginTop: 10}]}>Data Sharing</Text>
          <Text style={[styles.contentStyle]}>
            We do not sell your personal information. We only share it with our beneficiary company, <Text style={{fontWeight: 'bold'}}>RMC Oil and Ecosolutions</Text>, to fulfill requested household collections.
          </Text>
          <Text style={[styles.subtitleStyle, {marginTop: 10}]}>Data Security</Text>
          <Text style={[styles.contentStyle]}>
            We implement industry-standard security measures to protect your personal information from unauthorized access and misuse. While we strive to ensure the highest level of security, no system is entirely impenetrable.
          </Text>
          <Text style={[styles.subtitleStyle, {marginTop: 10}]}>Your Choices</Text>
          <Text style={[styles.contentStyle]}>
            You have full control over your data. Within the <Text style={{fontWeight: 'bold'}}>"Manage Account"</Text> section of the app, you can review and update your personal information. You also have the right to request the deletion of your account and all associated data at any time.
          </Text>
          <Text style={[styles.subtitleStyle, {marginTop: 10}]}>Contact Us</Text>
          <Text style={[styles.contentStyle]}>
            For any questions or concerns regarding this Privacy Policy, please contact us at <Text style={{fontWeight: 'bold'}}>inquiries@ecollector.com</Text>
          </Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    privacyPolicyContainerStyle: {
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

