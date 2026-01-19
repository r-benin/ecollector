import Button from "@/components/Button";
import CollectionModal from "@/components/DepositCollectionModal";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Firestore imports
import { ActiveCollection } from "@/components/ActiveCollection";
import QRModal from "@/components/QRModal";
import { TransactionsContext } from "../_layout";

export default function DepositScreen() {
  const [collectionModalVisible, setCollectionModalVisible] = useState<boolean>(false)
  const [QRModalVisible, setQRModalVisible] = useState<boolean>(false)
  const router = useRouter()

  const { user, activeCollection } = useContext(TransactionsContext)

  useEffect(() => {
    setQRModalVisible(false)
  }, [activeCollection])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      
      <CollectionModal visible={collectionModalVisible} onRequestClose={() => setCollectionModalVisible(false)}/>
      
      { activeCollection ? (activeCollection.status !== 'rejected' || activeCollection.status !== 'cancelled') ?
        <QRModal visible={QRModalVisible} onRequestClose={() => setQRModalVisible(false)} QRData={activeCollection.collectionID}/> : null : null
      }

      <Button text={'Search nearby collection points'} width={'85%'} height={58} preset="outline" textColor="#323232" style={styles.depositButton}
      icon={<MaterialCommunityIcons name="map-search" size={30} color="#323232"/>} onPress={() => {router.push('/collection-map')}}/>
      
      <Button text={'Request a household collection'} width={'85%'} height={58} preset="outline" textColor="#323232" style={styles.depositButton}
      icon={<MaterialIcons name="location-on" size={30} color="#323232"/>} onPress={() => setCollectionModalVisible(true)}
      disabled={activeCollection ? activeCollection.status === 'pending' || activeCollection.status === 'ongoing' : false} />
      
      <Text style={styles.noteStyle}><Text style={{fontWeight: 'bold'}}>Note:</Text> All household collections are subject to approval.</Text>
      
      <TouchableOpacity style={styles.depositGuideStyle} onPress={() => {router.push('/collection-guide')}} activeOpacity={0.9}>
        <Text style={styles.depositGuideTextStyle}>New to Ecollector?</Text>
        <Text style={[styles.depositGuideTextStyle, {paddingBottom: 10}]}>Tap here to see <Text style={{fontWeight: 'bold'}}>how collection works</Text></Text>
        <Image source={require('../../assets/images/cooking-oil-bg.jpg')} style={styles.depositGuideBackgroundImageStyle}/>
      </TouchableOpacity>
      
      <ActiveCollection
        collectionID={activeCollection ? activeCollection.collectionID : null}
        status={activeCollection ? activeCollection.status : null}
        date={activeCollection ? activeCollection.date : null}
        showQR={setQRModalVisible}
      />

      <Text style={[styles.noteStyle, {maxWidth: '85%', marginTop: 10}]}><Text style={{fontWeight: 'bold'}}>Note: </Text> 
      You can only request one (1) household collection at a time.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  depositButton: {
    borderColor: '#D9D9D9',
    marginVertical: 5
  },
  noteStyle: {
    color: '#D9D9D9',
    marginTop: 3,
  },
  depositGuideStyle: {
    width: '85%',
    height: 120,
    borderRadius: 15,
    backgroundColor: '#0E9D03',
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 25
  },
  depositGuideTextStyle: {
    width: '100%',
    textAlign: 'right',
    fontSize: 18,
    color: 'white',
    textShadowColor: 'rgba(0,0,0, 1))',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 5,
    paddingRight: 10
  },
  depositGuideBackgroundImageStyle: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    borderRadius: 15,
    opacity: 0.4
  }
})