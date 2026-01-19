import AntDesign from '@expo/vector-icons/AntDesign';
import { SetStateAction } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


interface AccordionProps {
    header: string,
    content: string,
    itemIndex: number,
    accordionIndex: number | null,
    setAccordionIndex: React.Dispatch<SetStateAction<number | null>>
}

export default function Accordion( {header, content, itemIndex, accordionIndex, setAccordionIndex} : AccordionProps ) {

    function handleAccordionPress() {
        if (itemIndex === accordionIndex) {
            setAccordionIndex(null)
        } else {
            setAccordionIndex(itemIndex)
        }
    }

    return (
        <View style={styles.accordionContainerStyle}>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.headerTextStyle}>{header}</Text>
                <TouchableOpacity activeOpacity={0.7}  style={{width: '10%', justifyContent: 'center', alignItems: 'center'}} onPress={() => handleAccordionPress()}>
                    { itemIndex !== accordionIndex ? <AntDesign name="plus" size={24} color="#0E9D03" />
                        : <AntDesign name="minus" size={24} color="#0E9D03" />
                    }
                </TouchableOpacity>
            </View>
            { itemIndex === accordionIndex ? 
                <View style={{width: '100%', marginVertical: 10}}>
                    <Text style={styles.contentTextStyle}>
                        {content}
                    </Text>
                </View> : null 
            }
        </View>
    )
}

const styles = StyleSheet.create({
    accordionContainerStyle: {
    },
    headerTextStyle: {
        width: '87%',
        color: '#323232',
        fontSize: 20,
        fontWeight: 'bold',
    },
    contentTextStyle: {
        width: '95%',
        color: '#323232',
        fontSize: 14,
        textAlign: 'justify'
    }
})