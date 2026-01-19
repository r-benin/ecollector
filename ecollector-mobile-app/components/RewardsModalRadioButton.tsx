import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { rewardType } from './RewardsList'

interface rewardsModalRadioButtonProps {
    label: string
    icon?: React.ReactElement
    onPress?: (type: any) => void
    selected: rewardType | 'List' | 'Tile'
}

export default function RewardsModalRadioButton({ label, onPress, selected, icon } : rewardsModalRadioButtonProps) {
    const isSelected = label === selected
    return (
        <TouchableOpacity style={[isSelected ? {backgroundColor: 'rgba(14, 157, 3, 0.1)', borderColor: '#0E9D03'} : {borderColor: '#D9D9D9'}, [styles.rewardTypeButtonStyle]]} onPress={onPress}>
            {icon? icon : null}
            <Text style={{color: '#323232'}}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    rewardTypeButtonStyle: {
        height: 35,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        marginRight: 5,
        flexDirection: 'row',
        marginBottom: 5,
        gap: 5
    },
})