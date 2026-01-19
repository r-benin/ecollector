import Card from "@/components/Card";
import ProfileBanner from "@/components/ProfileBanner";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { TransactionsContext } from "../_layout";

import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Firestore imports
import Button from "@/components/Button";
import QRModal from "@/components/QRModal";
import TransactionItem, { transactionItemProps } from "@/components/TransactionItem";

export type fullName = {
  firstName: string
  lastName: string
}

export default function HomeScreen() {
  const [recentTransactions, setRecentTransactions] = useState<any>([])
  const [userQRVisible, setUserQRVisible] = useState(false)

  const router = useRouter()
  
  const { user, userData, userTransactions } = useContext(TransactionsContext)

  // Fetch recent transactions
  useEffect(() => {

    let recentTransactionsArray: transactionItemProps[] = userTransactions.map((item: transactionItemProps) => {return item})
    if (recentTransactionsArray.length > 1) { recentTransactionsArray.sort((a: any, b: any) => b.transactionDate - a.transactionDate) }
    setRecentTransactions(recentTransactionsArray.slice(0, 3))

  }, [userTransactions])

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1
      }}
    >
      <QRModal visible={userQRVisible} onRequestClose={() => setUserQRVisible(false)} QRData={user.uid} />
      <View style={styles.headerStyle}>
      </View>
      <View style={styles.homeContentStyle}>
        <ProfileBanner name={{firstName: userData ? userData.firstName : '?', lastName: userData ? userData.lastName : '?'}}></ProfileBanner>
          <Card style={styles.creditContainerStyle}>
            <Text style={{color: '#0E9D03'}}>YOUR CREDITS</Text>
            <View style={{alignItems: 'flex-end', paddingRight: 20}}>
              <Text style={styles.creditText}>
              <Image style={{height: 30, resizeMode: 'contain'}} source={require('../../assets/images/ecollector-credit-icon.png')}></Image>
              {userData ? new Intl.NumberFormat().format(userData.credits) : '?'}
              </Text>
            </View>
            <View style={styles.homeControlsStyle}>
            <Button
              text="My Vouchers"
              preset="outline"
              style={styles.homeButtonStyle}
              width={'48.5%'}
              textSize={14}
              height={40}
              textColor="#323232"
              icon={<Ionicons name="ticket" size={24} color="#323232" />}
              onPress={() => router.push('/vouchers')}
            />
            <Button
              text="My QR Code"
              preset="outline"
              style={styles.homeButtonStyle}
              width={'48.5%'}
              textSize={14}
              height={40}
              textColor="#323232"
              icon={<MaterialIcons name="qr-code" size={24} color="#323232" />}
              onPress={() => setUserQRVisible(true)}
            />
          </View>
          </Card>
      
      <Card style={[styles.recentTransactionsStyle, recentTransactions.length === 0 ? {minHeight: 170} : {minHeight: 'auto'}]}>
        <Text style={{color: '#0E9D03', fontWeight: 'bold', fontSize: 16}}>Recent Transactions</Text>
        {/* <TransactionList style={{}} transactionReference={recentTransactions}></TransactionList> */}
        <View>
          { recentTransactions.map((transaction: transactionItemProps, index: number) => {
              return (
                <>
                  <TransactionItem 
                    key={transaction.transactionId}
                    transactionId={transaction.transactionId}
                    transactionTitle={transaction.transactionTitle}
                    transactionDate={transaction.transactionDate}
                    transactionType={transaction.transactionType}
                    transactionValue={transaction.transactionValue}
                  />
                  { index < recentTransactions.length - 1 ? <View style={styles.separatorStyle} /> : null }
                </>
              )
            })
          }
        </View>
        { recentTransactions.length === 0 ?
          <View style={{alignItems: 'center', justifyContent: 'center', height: 110}}>
            <Text style={{color: '#D9D9D9'}}>You have no recent transactions.</Text>
          </View>
          : <TouchableOpacity style={{width: '100%', alignItems: 'center'}} onPress={() => {router.push('/(tabs)/history')}} activeOpacity={0.7}>
              <Text style={{color: '#0E9D03', fontSize: 14}} >View more</Text>
            </TouchableOpacity>
        }
        
      </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  creditText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#0E9D03',
    textAlign: 'right',
  },
  creditContainerStyle: {
    width: '80%',
    height: 155,
    marginTop: '3%',
  },
  headerStyle: {
    backgroundColor: '#0E9D03',
    height: '20%',
    width: '100%',
    position: 'absolute',
    top: 0
  },
  homeContentStyle: {
    width: '100%',
    alignItems: 'center',
    paddingTop: '12%'
  },
  recentTransactionsStyle: {
    marginTop: '7%',
    width: '80%',
    height: 'auto',
  },
  separatorStyle: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: '#D9D9D9',
    alignSelf: 'center'
  },
  homeControlsStyle: {
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  homeButtonStyle: {
    borderColor: '#D9D9D9'
  },









  myVouchersStyle: {
    marginTop: '5%',
    width: '80%',
    alignItems: 'center',
    minHeight: '20%',
    height: 'auto',
    position: 'relative'
  },

})
