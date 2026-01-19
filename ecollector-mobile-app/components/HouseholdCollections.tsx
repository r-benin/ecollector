import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Card from './Card';
import StatusLabel from './StatusLabel';

type collectionData = {
    collectionID: number,
    date: Date,
    status: 'Pending' | 'Approved' | 'Declined' | 'Completed' | 'Canceled'
}

const data: collectionData[] = [
    {collectionID: 1, date: new Date(), status: 'Approved'},
    {collectionID: 1, date: new Date(), status: 'Declined'},
    {collectionID: 1, date: new Date(), status: 'Pending'},
    {collectionID: 1, date: new Date(), status: 'Completed'},
    {collectionID: 2, date: new Date(), status: 'Canceled'}
]

export function HouseholdCollections() {
    return (
        <View>
            <Text style={{color: '#0E9D03', marginBottom: 10, fontSize: 16}}>Recent Household Collections</Text>
            <View style={styles.householdCollectionsStyle}>
                <Card style={styles.cardStyle}>
                    <FlatList data={data} renderItem={(collection) =>
                        <View style={styles.collectionItemStyle}>
                            <Text style={styles.collectionItemTextStyle}>{collection.item.date.toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}</Text>
                            <StatusLabel status={collection.item.status}/>
                            <TouchableOpacity style={{width: 20}}>
                                {collection.item.status == 'Pending' || collection.item.status == 'Approved' ? <SimpleLineIcons name="options" size={20} color="#D9D9D9" /> : null}
                            </TouchableOpacity>
                        </View>
                    } scrollEnabled={false} />
                </Card>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    householdCollectionsStyle: {
        height: 282,
        width: '90%'
    },
    cardStyle: {
        width: '100%',
        height: '100%'
    },
    collectionItemStyle: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems: 'center',
    },
    collectionItemTextStyle: {
        color: '#323232',
        fontWeight: 'bold'
    }
})