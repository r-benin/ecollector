import VoucherItem from "@/components/VoucherItem";
import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import QRModal from "@/components/QRModal";
import firestore from '@react-native-firebase/firestore';
import { TransactionsContext } from "./_layout";


export default function VouchersScreen() {
    const [vouchers, setVouchers] = useState<any[]>([])

    const { user } = useContext(TransactionsContext)
    
    const [voucherQRVisible, setVoucherQRVisible] = useState<{visible: boolean, voucherId: string | null}>({visible: false, voucherId: null})

    useEffect(() => {
        const getVouchers = firestore().collection('ecollector_vouchers')
            .where('userId', '==', user.uid)
            .onSnapshot((snapshot) => {
                let vouchersArray: any[] = []
                snapshot.forEach((voucher) => {
                    voucher.data().voucherExpiry && voucher.data().voucherStatus === 'Active' ? vouchersArray.push({...voucher.data(), voucherId: voucher.id}) : null
                })
                if (vouchersArray.length > 1) { vouchersArray.sort((a, b) => b.voucherCreatedOn - a.voucherCreatedOn) }
                setVouchers(vouchersArray)
                setVoucherQRVisible({visible: false, voucherId: null})
            })
    }, [])
    
    return (
        <View style={styles.voucherContainerStyle}>
            <QRModal QRData={voucherQRVisible.voucherId ? voucherQRVisible.voucherId : ''} visible={voucherQRVisible.visible} onRequestClose={() => setVoucherQRVisible({visible: false, voucherId: null})}/>
            <FlatList data={vouchers} renderItem={({item}: any) => 
                <VoucherItem name={item.voucherTitle} icon={item.rewardId} expiryDate={item.voucherExpiry} setVoucherQRVisible={setVoucherQRVisible} voucherId={item.voucherId}/>
            } ItemSeparatorComponent={() => <View style={styles.separatorStyle}/>} style={{paddingTop: 10}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    voucherContainerStyle: {
        flex: 1,
    },
    rewardsListItemStyle: {
        width: '100%',
        height: 72,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: '8%'
    },
    separatorStyle: {
        width: '90%',
        borderBottomWidth: 0.5,
        borderColor: '#D9D9D9',
        alignSelf: 'center'
    },
    





    costContainerStyle: {
        position: 'absolute',
        right: '10%',
        flexDirection: 'row',
        alignItems: 'center'
    },

})

