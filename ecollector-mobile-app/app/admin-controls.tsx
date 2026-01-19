import Button from "@/components/Button";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { TransactionsContext } from "./_layout";

import AvatarIcon from "@/components/AvatarIcon";
import Card from "@/components/Card";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Firestore imports
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

type FindQRType = {
  found: boolean,
  QRType: 'user' | 'voucher' | 'collection' | null
}

export default function AdminControls() {
  const router = useRouter()
  const { QRScanned, setQRScanned } = useContext(TransactionsContext)
  const [QRControlsShown, setQRControlsShown] = useState<boolean>(false)
  const [QRFound, setQRFound] = useState<FindQRType>({found: false, QRType: null})
  const [QRUser, setQRUser] = useState<any>(null)
  const [QRCollection, setQRCollection] = useState<any>(null)
  const [QRVoucher, setQRVoucher] = useState<any>(null)
  const [iconRef, setIconRef] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  // Control states
  const [addCredit, setAddCredit] = useState<number | null>(null)

  // Fetch reward icon
  async function fetchIcon(icon: string) {
    const iconRef = await storage().ref(`/ecollector_assets/rewards/${icon}`).getDownloadURL()
    setIconRef(iconRef)
  }

  // Handle credit input
  function handleInput(text: string) {
    setAddCredit(parseInt(text))
  }

  function promptCancel() {
    Alert.alert('Confirm action',
      'Are you sure you want to cancel?',
      [
        {
          text: 'Confirm',
          onPress: () => resetControls()
        },
        {
          text: 'Cancel'
        }
      ]
    )
  }

  async function logDeposit() {
    setIsProcessing(true)
    try { 
      const logDeposit = await firestore()
        .collection('ecollector_transactions')
        .add({
            name: `${QRUser.firstName} ${QRUser.lastName}`,
            transactionDate: firestore.FieldValue.serverTimestamp(),
            transactionTitle: `UCO Collection Point Deposit`,
            transactionType: 'Deposit',
            transactionValue: addCredit,
            userId: QRScanned
        })
        .then(() => {
          const updateCredits = firestore()
            .collection('ecollector_users')
            .doc(QRScanned)
            .update({credits: firestore.FieldValue.increment(addCredit ? addCredit : 0)})
          Alert.alert('Deposit success',
          'Transaction has been logged',
          [
            {
              text: 'Confirm',
            }
          ])
        })
          resetControls()
        } catch {
          Alert.alert('Error',
          'Deposit failed, please try again later.',
          [
            {
              text: 'Confirm',
            }
          ])
          setIsProcessing(false)
        }
  }

  async function fulfillCollection() {
    setIsProcessing(true)
    try { 
      const fulfillCollection = await firestore()
        .collection('ecollector_transactions')
        .add({
            name: QRCollection.fullName,
            transactionDate: firestore.FieldValue.serverTimestamp(),
            transactionTitle: `UCO household collection`,
            transactionType: 'Deposit',
            transactionValue: addCredit,
            userId: QRCollection.userId
        })
        .then(() => {
          const updateCredits = firestore()
            .collection('ecollector_users')
            .doc(QRCollection.userId)
            .update({credits: firestore.FieldValue.increment(addCredit ? addCredit : 0)})
          const markAsCompleted = firestore()
            .collection('ecollector_requests')
            .doc(QRScanned)
            .update({status: 'completed'})
          Alert.alert('Collection success',
          'Household collection completed!',
            [
              {
                text: 'Confirm',
              }
            ])
          })
          resetControls()
        } catch {
          Alert.alert('Error',
          'Deposit failed, please try again later.',
          [
            {
              text: 'Confirm',
            }
          ])
          setIsProcessing(false)
        }
  }

  async function redeemVoucher() {
    setIsProcessing(true)
    try { 
      const redeemVoucher = await firestore()
        .collection('ecollector_vouchers')
        .doc(QRScanned)
        .update({
          voucherStatus: 'Redeemed'
        })
        .then(() => {
          Alert.alert('Redemption success',
          'Voucher redeemed successfully',
            [
              {
                text: 'Confirm',
              }
            ])
          })
          resetControls()
        } catch (error) {
          Alert.alert('Error',
          `Voucher redemption failed, please try again later. ${error}`,
          [
            {
              text: 'Confirm',
            }
          ])
          setIsProcessing(false)
        }
  }

  function resetControls() {
    setIsProcessing(false)
    setIconRef(null)
    setAddCredit(null)
    setQRScanned(null)
    setQRUser(null)
    setQRCollection(null)
    setQRVoucher(null)
    setQRFound({found: false, QRType: null})
  }

  // useEffect for resetting QR values as null when mounted or unmounted

  useEffect(() => {
    
    const resetQRData = () => {
      resetControls()
    }

    return resetQRData

  }, [])

  // useEffect for finding qr data from database once scanned
  useEffect(() => {

    if (QRScanned) {
      const validateQR = async () => {
        try {
          let QRExists = false
          const [userDocSnapshot, voucherDocSnapshot, requestDocSnapshot] = await Promise.all([
            firestore().collection('ecollector_users').doc(`${QRScanned}`).get()
            .then(docSnapshot => {
              QRExists = true
              if (docSnapshot.exists()) {
                setQRFound({found: true, QRType: 'user'})
                setQRUser(docSnapshot.data())
              }
            }),
            firestore().collection('ecollector_vouchers').doc(`${QRScanned}`).get()
            .then(docSnapshot => {
              if (docSnapshot.exists()) {
                QRExists = true
                if (docSnapshot.data()?.voucherStatus === 'Active') {
                  setQRFound({found: true, QRType: 'voucher'})
                  setQRVoucher(docSnapshot.data())
                  fetchIcon(docSnapshot.data()?.rewardId)
                } else {
                  Alert.alert('Invalid QR', 'This QR is not valid anymore')
                  resetControls()
                }
              }
            }),
            firestore().collection('ecollector_requests').doc(`${QRScanned}`).get()
            .then(docSnapshot => {
              if (docSnapshot.exists()) {
                QRExists = true              
                if (docSnapshot.data()?.status === 'ongoing') {
                  setQRFound({found: true, QRType: 'collection'})
                  setQRCollection(docSnapshot.data())
                } else {
                  Alert.alert('Invalid QR', 'This QR is not valid anymore')
                  resetControls()
                }
              }
            })
          ]);
          if (!QRExists) {
            Alert.alert('Invalid QR', 'QR data not found!')
          }
        } catch (error) {
          Alert.alert(`Database error', 'An error has occured! ${error}`)
        }
      }
      validateQR()
    }
  
  }, [QRScanned])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: '10%',
      }}
    >

      <Button text={'Scan QR'} width={'85%'} height={58} preset="outline" textColor="#323232" style={styles.buttonStyle}
      icon={<MaterialIcons name="qr-code" size={24} color="#323232" />} onPress={() => {router.push('/admin-scanner')}}
      disabled={QRScanned ? true : false} />

      <Text style={[styles.noteStyle, {maxWidth: '85%', marginTop: 10}]}><Text style={{fontWeight: 'bold'}}>Note: </Text> 
      Scanned QR details and corresponding controls will appear below.
      </Text>

      {
        QRFound.found && QRFound.QRType === 'user' && QRUser ?
        <View style={{width: '85%'}}>
          <Text style={{color: '#0E9D03', marginBottom: 10, fontSize: 16}}>Collection Point Deposit Controls</Text>
          <View style={{width: '100%', height: 265}}>
              <Card style={styles.cardStyle}>
                <View style={styles.userDetails}>
                  <AvatarIcon size={80} name={{firstName: QRUser.firstName, lastName: QRUser.lastName}} backgroundColor="green"></AvatarIcon>
                  <View style={{height: '100%', flex: 1, paddingLeft: 10}}>
                    <Text style={{height: '50%', textAlignVertical: 'bottom', fontWeight: 'bold', color: '#323232', fontSize: 16}} numberOfLines={1} ellipsizeMode="tail">{QRUser.firstName} {QRUser.lastName}</Text>
                    <Text style={{height: '50%', textAlignVertical: 'top', color: '#D9D9D9'}} numberOfLines={2} ellipsizeMode="tail">{QRUser.address.barangay}, {QRUser.address.city}</Text>
                  </View>
                </View>
                <TextInput style={styles.inputStyle}
                  placeholder="Enter amount of credits to reward"
                  keyboardType="number-pad"
                  onChangeText={handleInput}
                  maxLength={2}
                />
                <Button text={'Log deposit'} width={'100%'} height={35} textSize={14} style={{marginTop: 15}}
                disabled={addCredit === null || isNaN(addCredit) || isProcessing} onPress={() => logDeposit()}/>
                <Button text={'Cancel'} width={'100%'} height={35} textSize={14} style={{marginTop: 7}}
                preset='solid' buttonColor='rgba(14, 157, 3, 0.15)' textColor='#0E9D03' onPress={() => promptCancel()}/>
              </Card>
          </View>
        </View>
        : null
      }

      {/* Household Collection */}
      {
        QRFound.found && QRFound.QRType === 'collection' && QRCollection ?
        <View style={{width: '85%'}}>
          <Text style={{color: '#0E9D03', marginBottom: 10, fontSize: 16}}>Collection Point Deposit Controls</Text>
          <View style={{width: '100%', height: 265}}>
              <Card style={styles.cardStyle}>
                <View style={styles.collectionDetailsStyle}>
                  <View style={styles.statusIconStyle}>
                    <MaterialCommunityIcons name="truck-delivery-outline" size={50} color="#0E9D03" />
                  </View>
                  <View style={{height: '100%', flex: 1, paddingLeft: 10}}>
                    <Text style={{height: '50%', textAlignVertical: 'bottom', fontWeight: 'bold', color: '#323232', fontSize: 16}} numberOfLines={1} ellipsizeMode="tail">{QRCollection.fullName}</Text>
                    <Text style={{height: '50%', textAlignVertical: 'top', color: '#D9D9D9'}} numberOfLines={2} ellipsizeMode="tail">Awaiting household collection</Text>
                  </View>
                </View>
                <TextInput style={styles.inputStyle}
                  placeholder="Enter amount of credits to reward"
                  keyboardType="number-pad"
                  onChangeText={handleInput}
                  maxLength={2}
                />
                <Button text={'Collect'} width={'100%'} height={35} textSize={14} style={{marginTop: 15}}
                disabled={addCredit === null || isNaN(addCredit) || isProcessing} onPress={() => fulfillCollection()}/>
                <Button text={'Cancel'} width={'100%'} height={35} textSize={14} style={{marginTop: 7}}
                preset='solid' buttonColor='rgba(14, 157, 3, 0.15)' textColor='#0E9D03' onPress={() => promptCancel()}/>
              </Card>
          </View>
        </View>
        : null
      }

      {/* Voucher Redemption */}
      {
        QRFound.found && QRFound.QRType === 'voucher' && QRVoucher ?
        <View style={{width: '85%'}}>
          <Text style={{color: '#0E9D03', marginBottom: 10, fontSize: 16}}>Collection Point Deposit Controls</Text>
          <View style={{width: '100%', height: 212}}>
              <Card style={styles.cardStyle}>
                <View style={styles.collectionDetailsStyle}>
                  <View style={styles.statusIconStyle}>
                    { iconRef && <Image source={{uri: iconRef}} style={{width: 45, height: 45}}/> }
                  </View>
                  <View style={{height: '100%', flex: 1, paddingLeft: 10}}>
                    <Text style={{height: '50%', textAlignVertical: 'bottom', fontWeight: 'bold', color: '#323232', fontSize: 16}} numberOfLines={1} ellipsizeMode="tail">{QRVoucher.voucherTitle} Voucher</Text>
                    <Text style={{height: '50%', textAlignVertical: 'top', color: '#D9D9D9'}} numberOfLines={2} ellipsizeMode="tail">Redeemable voucher</Text>
                  </View>
                </View>
                <Button text={'Redeem'} width={'100%'} height={35} textSize={14} style={{marginTop: 0}}
                disabled={ isProcessing } onPress={() => redeemVoucher()}/>
                <Button text={'Cancel'} width={'100%'} height={35} textSize={14} style={{marginTop: 7}}
                preset='solid' buttonColor='rgba(14, 157, 3, 0.15)' textColor='#0E9D03' onPress={() => promptCancel()}/>
              </Card>
          </View>
        </View>
        : null
      }

    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderColor: '#D9D9D9',
  },
  noteStyle: {
    color: '#D9D9D9',
    marginTop: 3,
    marginBottom: 20
  },
  cardStyle: {
      width: '100%',
      height: '100%',
      alignItems: 'center'
  },
  userDetails: {
    width: '100%',
    height: 80,
    marginBottom: 20, 
    flexDirection: 'row',
  },
  collectionDetailsStyle: {
    width: '100%',
    height: 80,
    marginBottom: 20, 
    flexDirection: 'row',
  },
  statusIconStyle: {
    width: 80,
    height: 80,
    backgroundColor: '#0E9D031A',
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputStyle: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#D9D9D9',
    paddingLeft: 10,
    color: '#323232'
  },
})