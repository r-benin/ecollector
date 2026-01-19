import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Button from './Button';
import { rewardType, rewardTypes } from './RewardsList';
import RewardsModalRadioButton from './RewardsModalRadioButton';

import Ionicons from '@expo/vector-icons/Ionicons';

interface rewardsFilterModalProps {
    onRequestClose: () => void
    visible: boolean
    selectedRewardType: rewardType
    setCategory: (type: rewardType) => void
    listStyle: 'List' | 'Tile'
    setListView: (type: 'List' | 'Tile') => void
}

type filter = {
    view: 'List' | 'Tile',
    category: rewardType
}

export default function RewardsFilterModal({ onRequestClose, visible, selectedRewardType, setCategory, listStyle, setListView } : rewardsFilterModalProps) {
    const previousFilter: filter = {view: listStyle, category: selectedRewardType}
    const [newFilter, setFilter] = useState<filter>(previousFilter)
    function applyFilter(newFilter: filter) {
        setCategory(newFilter.category)
        setListView(newFilter.view)
        onRequestClose()
    }
    function resetFilter() {
        setFilter(previousFilter)
        setCategory(previousFilter.category)
        setListView(previousFilter.view)
    }
    return (
        <Modal
            animationType='fade'
            onRequestClose={onRequestClose}
            visible={visible}
            statusBarTranslucent
            transparent
        >
            <View style={styles.rewardsFilterModalStyle}>
                <Text style={{color: '#323232', fontWeight: 'bold', fontSize: 24}}>Filter</Text>

                <View style={styles.modalGroupContainer}>
                    <Text style={{color: '#323232', fontWeight: 'bold', fontSize: 20}}>View</Text>
                    <View style={{width: '50%', flexDirection: 'row'}}>
                        <RewardsModalRadioButton label={'List'} selected={newFilter.view} onPress={() => setFilter({view: 'List', category: newFilter.category})}
                            icon={<Ionicons name="list" size={20} color="#323232" />} />
                        <RewardsModalRadioButton label={'Tile'} selected={newFilter.view} onPress={() => setFilter({view: 'Tile', category: newFilter.category})}
                            icon={<Ionicons name="grid" size={18} color="black" />} />
                    </View>
                </View>

                <View style={styles.modalGroupContainer}>
                    <Text style={{color: '#323232', fontWeight: 'bold', fontSize: 20}}>Category</Text>
                    <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap'}}>
                        {rewardTypes.map((reward, index) => <RewardsModalRadioButton key={index} label={reward} selected={newFilter.category} onPress={() => setFilter({view: newFilter.view, category: reward})}/>)}
                    </View>
                </View>

                {/* <View style={styles.modalGroupContainer}>
                    <Text style={{color: '#323232', fontWeight: 'bold', fontSize: 20}}>Price</Text>
                </View> */}

                <View style={{width: '85%', justifyContent: 'space-around', flexDirection: 'row', position:'absolute', bottom: 50}} >
                    <Button text={'Reset'} buttonColor='rgba(14, 157, 3, 0.15)' textColor='#0E9D03' width={165} onPress={() => {resetFilter()}}></Button>
                    <Button text={'Apply'} width={165} onPress={() => applyFilter(newFilter)}/>
                </View>
            </View>

            <TouchableWithoutFeedback onPress={onRequestClose}>
                <View style={styles.modalBackdrop}>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    rewardsFilterModalStyle: {
        height: 'auto',
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: 'absolute',
        bottom: 0,
        paddingTop: 30,
        paddingBottom: '35%',
        alignItems: 'center',
    },
    modalBackdrop: {
        height: '100%',
        width: '100%',
        opacity: 0.5,
        backgroundColor: 'black',
        zIndex: -1
    },
    modalGroupContainer: {
        width: '85%',
        gap: 10,
        marginBottom: 20
    },
    modalGroupTitle: {
        color: '#323232',
        fontWeight: 'bold',
        fontSize: 24
    }
})