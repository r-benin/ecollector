import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { rewardType } from './RewardsList'

interface rewardsListHeaderButtonProps {
    label: string
    onPress?: () => void
    selected: rewardType
}

export default function RewardsListHeaderButton({ label, onPress, selected } : rewardsListHeaderButtonProps) {
    const isSelected = label === selected
    return (
        <TouchableOpacity style={[isSelected ? {backgroundColor: '#0E9D03'} : null, styles.rewardTypeButtonStyle]} onPress={onPress}>
            <Text style={isSelected ? {color: 'white' } : {color: '#0E9D03'}}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    rewardTypeButtonStyle: {
        height: 35,
        borderWidth: 1,
        borderColor: '#0E9D03',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        marginRight: 5
    },
})