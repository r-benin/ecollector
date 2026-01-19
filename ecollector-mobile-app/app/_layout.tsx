import { reward } from "@/components/RewardsList";
import { useColorScheme } from "@/hooks/useColorScheme";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { createContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Authentication imports
import auth from '@react-native-firebase/auth';
import LoginScreen from "./login-screen";
import OTPScreen from "./otp-screen";
import RegisterScreen from "./register-screen";

// Firestore imports
import { collectionDataType } from "@/components/ActiveCollection";
import firestore from '@react-native-firebase/firestore';

export const TransactionsContext = createContext<any>([])

export default function RootLayout() {
  // useState Hooks
  const [otpPhoneNumber, setOTPPhoneNumber] = useState('')
  const [OTPcode, setOTPCode] = useState('');
  const [confirm, setConfirm] = useState<any>(null);
  const [initializing, setInitializing] = useState(true)
  const [shouldRegister, setShouldRegister] = useState(false)
  const [user, setUser] = useState<any | null>()
  const [userData, setUserData] = useState<any>()
  const [userTransactions, setUserTransactions] = useState<any[]>()
  const [activeCollection, setActiveCollection] = useState<collectionDataType | null>()
  const [rewards, setRewards] = useState<reward[]>([])
  const [vouchers, setVouchers] = useState<any[]>([])
  const [pinLocation, setPinLocation] = useState()
  const [QRScanned, setQRScanned] = useState<string | null>(null)

  // Register storage
  const [registerStorage, updateRegisterStorage] = useState<any>()
  
  // Log user
  useEffect(() => {console.log('auth', auth().currentUser)})
  
  // Fetches user data from database when logged in (user state changes)
  useEffect(() => {
    if (!user) {
      setUserData(null)
      setUserTransactions([])
      return
    }

    const accountSubscriber = firestore().collection('ecollector_users')
      .doc(user.uid)
      .onSnapshot(
        (documentSnapshot) => { 
          setUserData(documentSnapshot.data())
        }
    )

    const transactionSubscriber = firestore().collection('ecollector_transactions')
    .where('userId', '==', user.uid)
    .onSnapshot( (querySnapshot) => {
      const transactions: any = []
      querySnapshot.forEach((transaction) => 
        transaction.data().transactionDate ? transactions.push({...transaction.data(), transactionDate: transaction.data().transactionDate.toDate()}) : null
      )
      if (transactions.length > 1) { transactions.sort((a: any, b: any) => a.transactionDate - b.transactionDate) }
      setUserTransactions(transactions)
    })

    const requestSubscriber = firestore()
      .collection('ecollector_requests')
      .where('userId', '==', `${user.uid}`)
      .onSnapshot(snapshot => {
        if (snapshot.empty) {
          setActiveCollection(null);
        } else {
          const requestsArray: any[] = [];
          snapshot.forEach((request) => {
            requestsArray.push({...request.data(), collectionID: request.id});
      });
        requestsArray.sort((a, b) => b.placedOn - a.placedOn);
        if (requestsArray[0]) {
          setActiveCollection({
            collectionID: requestsArray[0].collectionID,
            date: requestsArray[0] ? requestsArray[0].collectionDate.toDate() : new Date(),
            status: requestsArray[0].status
          });
        }
      }
      });
    
    const getRewards = firestore().collection('ecollector_rewards')
      .orderBy('rewardType', 'asc')
      .onSnapshot((snapshot) => {
        let rewardsArray: any[] = []
        snapshot.forEach((reward) => {
          if (reward.data().status === 'Active') {
            rewardsArray.push({...reward.data(), rewardId: reward.id})
          }
        })
        setRewards(rewardsArray)
      })

    return () => {
      accountSubscriber()
      transactionSubscriber()
      requestSubscriber()
      getRewards()
    }

  }, [user])

  useEffect(() => {
    console.log('Transactions state updated: ', userTransactions)
    console.log('Data state update!', userData)
  }, [userTransactions, userData])

  function handleAuthStateChanged(user: any) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    } 
  }  

  function onAuthStateChanged(user: any) {
    setUser(user)
    if (initializing) { setInitializing(false) }
    if (!user) { setConfirm(null) }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // If user is newly registered, adds the account to the database
  useEffect(() => {
    if (user && shouldRegister) {
      const userId = user.uid
      const userData = {
        'firstName': registerStorage.firstName,
        'lastName': registerStorage.lastName,
        'email': registerStorage.email,
        'mobileNumber': registerStorage.mobileNumber,
        'address': {
          'barangay': registerStorage.barangay,
          'city': 'Valenzuela City',
          'region': 'National Capital Region (NCR)',
          'street': registerStorage.streetAddress
        },
        'createdOn': firestore.FieldValue.serverTimestamp(),
        'credits': 0,
      }

      const registerUser = async (userData: any) => {         
        try {
          await firestore().collection('ecollector_users')
          .doc(userId)
          .set(userData)
          .then(() => {console.log('Account created successfully!')})

          await firestore().collection('registered_numbers')
          .doc(userData.mobileNumber)
          .set({})

          updateRegisterStorage(null)
          setShouldRegister(false)
        } catch (error) {
          console.log('Error creating account!', error)
        }
      }

      console.log(userData)

      registerUser(userData)

    }
  }, [user])
  
  // Theme
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  
  if (!user && !confirm) {
    if (shouldRegister) { return (<RegisterScreen setConfirm={setConfirm} setOTPPhoneNumber={setOTPPhoneNumber} updateRegisterStorage={updateRegisterStorage} registerStorage={registerStorage} setShouldRegister={setShouldRegister} />)}
    return ( <LoginScreen setConfirm={setConfirm} setOTPPhoneNumber={setOTPPhoneNumber} setShouldRegister={setShouldRegister}/> )
  } else if (confirm && !user) {
    return ( <OTPScreen code={OTPcode} setCode={setOTPCode} confirm={confirm} otpPhoneNumber={otpPhoneNumber} setShouldRegister={setShouldRegister} shouldRegister={shouldRegister} registerStorage={registerStorage} setConfirm={setConfirm}/> )
  } else if (user) {
    return (
      <TransactionsContext.Provider value={{user, userData, userTransactions, activeCollection, rewards, pinLocation, setPinLocation, QRScanned, setQRScanned}}>
        <ThemeProvider value={DefaultTheme}>
          <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Protected guard={user ? true : false}>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="collection-map" options={{
                    title: "CollectionPoints",
                    headerStyle: {
                      backgroundColor: '#0E9D03',
                    },
                    headerTitle: () => (
                      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', gap: 5}}>
                        <Text style={styles.headerTitleStyle}>Collection Points</Text>
                        <MaterialIcons name="water-drop" size={30} color={'white'}/>
                      </View>
                    ),
                    headerShown: true,
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                  }} />
                  <Stack.Screen name="vouchers" options={{
                    title: "VouchersScreen",
                    headerStyle: {
                      backgroundColor: '#0E9D03',
                    },
                    headerTitle: () => (
                      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', gap: 5}}>
                        <Text style={styles.headerTitleStyle}>My Vouchers</Text>
                        <Ionicons name="ticket" size={24} color="white" />
                      </View>
                    ),
                    headerShown: true,
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                  }} />
                  <Stack.Screen name="admin-controls" options={{
                    title: "AdminControls",
                    headerStyle: {
                      backgroundColor: '#0E9D03',
                    },
                    headerTitle: () => (
                      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', gap: 5}}>
                        <Text style={styles.headerTitleStyle}>Admin Controls</Text>
                        <Feather name="settings" size={30} color="white" />
                      </View>
                    ),
                    headerShown: true,
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                  }} />
                  <Stack.Screen name="admin-scanner" options={{
                    title: "AdminScanner",
                    headerStyle: {
                      backgroundColor: '#0E9D03',
                    },
                    headerTitle: () => (
                      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', gap: 5}}>
                        <Text style={styles.headerTitleStyle}>Scan QR</Text>
                        <MaterialIcons name="qr-code" size={30} color="white" />
                      </View>
                    ),
                    headerShown: true,
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                  }} />
                  <Stack.Screen name="pin-location" options={{
                    title: "PinLocation",
                    headerStyle: {
                      backgroundColor: '#0E9D03',
                    },
                    headerTitle: () => (
                      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', gap: 5}}>
                        <Text style={styles.headerTitleStyle}>Pin Location</Text>
                        <MaterialIcons name="water-drop" size={30} color={'white'}/>
                      </View>
                    ),
                    headerShown: true,
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                  }} />
                  <Stack.Screen name="collection-guide" options={{
                    title: "CollectionGuide",
                    headerStyle: {
                      backgroundColor: '#0E9D03',
                    },
                    headerTitle: () => (
                      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', gap: 5}}>
                        <Text style={styles.headerTitleStyle}>Collection Guide</Text>
                        <MaterialIcons name="water-drop" size={30} color={'white'}/>
                      </View>
                    ),
                    headerShown: true,
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                  }} />
                  <Stack.Screen name="faqs" options={{
                    title: "FAQs",
                    headerStyle: {
                      backgroundColor: '#0E9D03',
                    },
                    headerTitle: () => (
                      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', gap: 5}}>
                        <Text style={styles.headerTitleStyle}>FAQs</Text>
                        <MaterialCommunityIcons name="message-question-outline" size={25} color="white" />
                      </View>
                    ),
                    headerShown: true,
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                  }} />
                  <Stack.Screen name="privacy-policy" options={{
                    title: "Privacy Policy",
                    headerStyle: {
                      backgroundColor: '#0E9D03',
                    },
                    headerTitle: () => (
                      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', gap: 5}}>
                        <Text style={styles.headerTitleStyle}>Privacy Policy</Text>
                        <Feather name="shield" size={25} color="white" />
                      </View>
                    ),
                    headerShown: true,
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                  }} />
                  <Stack.Screen name="terms-of-service" options={{
                    title: "Terms of Service",
                    headerStyle: {
                      backgroundColor: '#0E9D03',
                    },
                    headerTitle: () => (
                      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', gap: 5}}>
                        <Text style={styles.headerTitleStyle}>Terms of Service</Text>
                        <Ionicons name="document-text-outline" size={25} color="white" />
                      </View>
                    ),
                    headerShown: true,
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                  }} />
                  <Stack.Screen name="manage-account" options={{
                    title: "Manage Account",
                    headerStyle: {
                      backgroundColor: '#0E9D03',
                    },
                    headerTitle: () => (
                      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', gap: 5}}>
                        <Text style={styles.headerTitleStyle}>Manage Account</Text>
                        <FontAwesome5 name="user-circle" size={25} color="white" />
                      </View>
                    ),
                    headerShown: true,
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                  }} />
                </Stack.Protected>
              <Stack.Screen name="+not-found" />
            </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </TransactionsContext.Provider>
  ); }
}

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  }
})