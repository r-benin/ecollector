import { TransactionsContext } from '@/app/_layout';
import { SetStateAction, useContext, useState } from 'react';
import { Alert, Image, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Button from './Button';
import { reward } from './RewardsList';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


interface rewardClaimModalType {
    onRequestClose: () => void
    visible: boolean
    reward: reward | null
    setRewardSelected: React.Dispatch<SetStateAction<reward | null>>
}

export default function RewardsClaimModal({ onRequestClose, visible, reward, setRewardSelected } : rewardClaimModalType) {

    const { user, userData } = useContext(TransactionsContext)

    const [iconRef, setIconRef] = useState<string | null>()

    async function fetchIcon() {
        await storage().ref(`/ecollector_assets/rewards/${reward?.icon}`)
            .getDownloadURL().then((url) => setIconRef(url))
    }

    fetchIcon()
    
    const userCanPurchase = userData && reward ? userData.credits < reward.cost ? false : true : false

    function promptClaimVoucher() {
        Alert.alert('Claim voucher',`Are you sure you want to claim a ${reward?.name} voucher?`,
            [
                {
                    text: 'Confirm',
                    onPress: () => claimVoucher()
                },
                {
                    text: 'Cancel'
                }
            ],
            {
                cancelable: true
            }
            
        )
    }
    
    async function claimVoucher() {
        
        if (!userCanPurchase) {
            Alert.alert('Failed to claim voucer','You do not have the sufficient amount of credits',
                [
                    {
                        text: 'Confirm'
                    }
                ]
            )
        }

        let expiryDate = new Date()
        expiryDate.setDate(expiryDate.getDate() + 15)
        expiryDate.setHours(0, 0, 0, 0)

        const voucher = {
          voucherTitle: reward?.name,
          voucherPrice:  reward?.cost,
          voucherStatus: 'Active',
          voucherExpiry: firestore.Timestamp.fromDate(expiryDate),
          voucherCreatedOn: firestore.FieldValue.serverTimestamp(),
          rewardId: reward?.rewardId,
          userId: user.uid,
        }

        if (reward && userCanPurchase) {
            try {
                const addVoucher = await firestore()
                    .collection('ecollector_vouchers')
                    .add(voucher)
                
                const deductCredits = await firestore()
                    .collection('ecollector_users')
                    .doc(user.uid)
                    .update({credits: (userData.credits - reward.cost)})

                const logTransaction = await firestore()
                    .collection('ecollector_transactions')
                    .add({
                        name: `${userData.firstName} ${userData.lastName}`,
                        transactionDate: firestore.FieldValue.serverTimestamp(),
                        transactionTitle: `Redeem ${reward.name.toLowerCase()}`,
                        transactionType: 'Redeem',
                        transactionValue: reward.cost,
                        userId: user.uid
                    })
                
                handleCloseModal()
                Alert.alert('Voucher claimed',`You have succesfully claimed a ${reward?.name} voucher. You may view its redemption QR in 'My Vouchers'`,
                    [
                        {
                            text: 'Confirm'
                        }
                    ]
                )
            } catch (error) {
                handleCloseModal()
                Alert.alert('Error claiming voucher!', `${error}`)
            }
        }


    }
    
    function handleCloseModal() {
        setRewardSelected(null)
        setIconRef(null)
        onRequestClose()
    }

    return (
        <Modal
            animationType='fade'
            onRequestClose={onRequestClose}
            visible={visible}
            statusBarTranslucent
            transparent
        >   
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={styles.rewardsClaimModalStyle}>
                    { iconRef && <Image source={{uri: iconRef}} style={styles.rewardImageStyle} /> }
                    <View style={styles.rewardTitleStyle}>
                        <View style={styles.rewardNameContainerStyle}>
                            <Text style={styles.rewardNameStyle} ellipsizeMode='tail' numberOfLines={2}>{reward?.name}</Text>
                            <Text style={styles.rewardTypeStyle}>{reward?.rewardType}</Text>
                        </View>
                        <View style={styles.costContainerStyle}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../assets/images/ecollector-credit-icon.png')}
                                style={{width: 17, resizeMode:'contain', marginRight: 3}}
                                />
                                <Text style={styles.costTextStyle}>{reward?.cost}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.rewardDescriptionTitleStyle} ellipsizeMode='tail' numberOfLines={3}>Description</Text>
                    <Text style={styles.rewardDescriptionStyle}>{reward?.description}</Text>
                    <View style={styles.controlsContainerStyle}>
                        <Button
                            text={'Claim'}
                            preset={'solid'}
                            width={'100%'}  
                            style={{marginBottom: 10}}
                            onPress={() => promptClaimVoucher()}
                            disabled={!userCanPurchase}
                        />
                        <Button
                            text={'Cancel'}
                            buttonColor={'rgba(14, 157, 3, 0.15)'}
                            textColor='#0E9D03'
                            preset={'solid'}
                            width={'100%'}  
                            style={{}}
                            onPress={() => handleCloseModal()}
                        />
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => handleCloseModal()}>
                    <View style={styles.modalBackdrop}>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            
        </Modal>
    )

}

const styles = StyleSheet.create({
    rewardsClaimModalStyle: {
        minHeight: 400,
        maxHeight: 500,
        width: '80%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 10,
        padding: '7%'
    },
    modalBackdrop: {
        height: '100%',
        width: '100%',
        opacity: 0.5,
        backgroundColor: 'black',
        zIndex: -1,
        position: 'absolute'
    },
    rewardImageStyle: {
        height: 150,
        width: 150,
        marginBottom: 20
    },
    rewardTitleStyle: {
        flexDirection: 'row',
        alignItems:'flex-start',
        width: '100%',
        borderColor: 'red'
    },
    rewardNameContainerStyle: {
        width: '80%',
        borderColor: 'blue',
        paddingTop: 5
    },
    rewardNameStyle: {
        fontWeight: 'bold',
        color: '#323232',
        fontSize: 20,
    },
    rewardTypeStyle: {
        width: '100%',
        color: '#323232',
        fontSize: 14,
    },
    costContainerStyle: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        height: '100%',
        width: '20%',
        borderColor: 'green'
    },
    costTextStyle: {
        color: '#0E9D03',
        fontSize: 20,
        fontWeight: 'bold'
    },
    rewardDescriptionTitleStyle: {
        fontWeight: 'bold',
        width: '100%',
        color: '#323232',
        fontSize: 14,
        marginTop: 15
    },
    rewardDescriptionStyle: {
        width: '100%',
        color: '#323232',
        fontSize: 14,
        textAlign: 'justify',
        marginBottom: 10
    },
    controlsContainerStyle: {
        width: '100%',
        height: '30%',
        position: 'relative',
        justifyContent: 'flex-end'
    }
})