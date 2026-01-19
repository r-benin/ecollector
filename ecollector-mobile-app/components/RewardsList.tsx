import { useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import RewardsListHeaderButton from "./RewardsListHeaderButton";
import RewardsListItem from "./RewardsListItem";

export type rewardType = 'All' | 'Home & Garden' | 'Kitchen & Dining' | 'Hygiene' | 'Miscellaneous'

interface rewardsListProps {
    refData: reward[]
    mode?: 'listView' | 'gridView'
    filter?: rewardType
    handleRewardPress: (rewardName: string) => void
}

export type reward = {
    rewardId: string
    name: string
    cost: number
    icon: string
    rewardType?: 'Home & Garden' | 'Kitchen & Dining' | 'Hygiene' | 'Miscellaneous'
    description?: string,
    status?: 'Active' | 'Inactive'
}

export const rewardTypes: rewardType[] = ['All', 'Home & Garden', 'Hygiene', 'Kitchen & Dining', 'Miscellaneous']

export default function RewardsList({ refData, mode, handleRewardPress } : rewardsListProps) {
    const [filterVisible, setFilterVisible] = useState(false)
    const [selectedRewardType, setSelectedRewardType] = useState<rewardType>('All')
    const [listView, setListView] = useState<'List' | 'Tile'>('List')
    const [numericSort, setNumericSort] = useState<'asc' | 'desc'>('asc')
    
    return (
        <FlatList data={selectedRewardType === 'All' ? refData : refData.filter((reward) => {return reward.rewardType === selectedRewardType})} renderItem={({item: reward}) =>
            <RewardsListItem
                key={reward.rewardId}
                rewardId={reward.rewardId}
                name={reward.name}
                cost={reward.cost}
                icon={reward.icon}
                onPress={() => handleRewardPress(reward.name)}
            />}
        style={{width: '100%'}} ItemSeparatorComponent={() => <View style={styles.separatorStyle}></View>}
        ListHeaderComponent={
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection: 'row'}}>
                <View style={styles.rewardsListHeaderStyle}>
                    {/* <RewardsFilterModal visible={filterVisible} onRequestClose={() => setFilterVisible(false)}
                        selectedRewardType={selectedRewardType} setCategory={setSelectedRewardType}
                        setListView={setListView} listStyle={listView}/>
                    <TouchableOpacity onPress={() => setFilterVisible(!filterVisible)}>
                        <MaterialIcons name="sort" size={40} color='#0E9D03' style={{marginRight: 20}}/>
                    </TouchableOpacity> */}
                    {rewardTypes.map((reward, index) => 
                        <RewardsListHeaderButton
                            key={index}
                            label={reward}
                            onPress={ () => setSelectedRewardType(reward)}
                            selected={ selectedRewardType }
                        ></RewardsListHeaderButton>
                    )}
                </View>
            </ScrollView>
        }
        />
    )
}

const styles = StyleSheet.create({
    separatorStyle: {
        width: '90%',
        borderBottomWidth: 0.5,
        borderColor: '#D9D9D9',
        alignSelf: 'center'
    },
    rewardsListHeaderStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingLeft: '5%',
        marginBottom: 15,
        alignItems: 'center',
        marginRight: 30,
    },
    rewardTypeButtonStyle: {
        height: 35,
        borderWidth: 1,
        borderColor: '#0E9D03',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
}) 