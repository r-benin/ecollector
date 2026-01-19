import AvatarIcon from "@/components/AvatarIcon";
import MeMenuItem from "@/components/MeMenuItem";

import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Button from "@/components/Button";
import auth from '@react-native-firebase/auth';
import { useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TransactionsContext } from "../_layout";

export default function MeScreen() {  
  
  const { userData, setQRScanned } = useContext(TransactionsContext)
  const router = useRouter()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <View style={styles.headerStyle}>
        <AvatarIcon size={100} name={{firstName: userData.firstName, lastName: userData.lastName}} ></AvatarIcon>
        <Text style={styles.nameStyle}>{`${userData.firstName} ${userData.lastName}`}</Text>
      </View>
      <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
        <View style={{width: '85%'}}>
          <MeMenuItem icon={<FontAwesome5 name="user-circle" size={25} color="#0E9D03" />} subtitle="Change address details" onPress={() => {router.push('/manage-account')}}>Manage account</MeMenuItem>
        </View>
        <View style={{width: '85%'}}>
          <MeMenuItem icon={<Feather name="shield" size={25} color="#0E9D03" />} subtitle="Privacy Policy" onPress={() => {router.push('/privacy-policy')}}>Privacy Policy</MeMenuItem>
        </View>
        <View style={{width: '85%'}}>
          <MeMenuItem icon={<Ionicons name="document-text-outline" size={25} color="#0E9D03" />} subtitle="Terms of Service" onPress={() => {router.push('/terms-of-service')}}>Terms of Service</MeMenuItem>
        </View>
        <View style={{width: '85%'}}>
          <MeMenuItem icon={<MaterialCommunityIcons name="message-question-outline" size={25} color="#0E9D03" />} subtitle="Frequently asked questions" onPress={() => {router.push('/faqs')}}>FAQs</MeMenuItem>
        </View>
        { userData.admin ? <View style={{width: '85%'}}>
          <MeMenuItem icon={<Feather name="settings" size={25} color="#0E9D03" />} subtitle="View controls for authorized personnel" onPress={() => {router.push('/admin-controls')}}>Admin Controls</MeMenuItem>
        </View>: null }
        <View style={{position: "absolute", bottom: 30}}>
          <Button text={'Log out'} preset="solid" width={280} textColor="#E33629" style={styles.logoutButton} onPress={() => auth().signOut()}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    width: '100%',
    height: '35%',
    backgroundColor: '#0E9D03',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '12%'

  },
  nameStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#E33629',
    backgroundColor: 'rgba(227, 54, 41, 0.1)',
  }
})
