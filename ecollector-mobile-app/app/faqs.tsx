import Accordion from "@/components/Accordion";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";



const generalFAQs = [
  { 
    header: 'What is this app for?', 
    content: 'This application makes it easy for you to responsibly dispose of your used cooking oil. Instead of throwing it away or pouring it down the drain, you can request a household collection or drop it by at a nearby collection point. In this way, your used cooking oil will eventually be recycled, helping reduce environmental waste and pollution.' 
  },
  { 
    header: 'Is this service free?', 
    content: 'Yes, our household collection service is completely free for all users.' 
  },
  { 
    header: 'What are the benefits of recycling my used cooking oil?', 
    content: 'Recycling used cooking oil helps the environment in several ways. It prevents oil from clogging drains and sewer systems, which can lead to costly and messy plumbing issues. It also reduces waste sent to landfills and lowers our carbon footprint by turning a waste product into a valuable resource, such as biofuel.' 
  },
  { 
    header: 'What kind of products are made from recycled oil?', 
    content: 'Used cooking oil can be reprocessed into raw materials for products such as biofuel, soaps, lubricants, animal feed, etc.' 
  },
  { 
    header: 'What are the negative effects of pouring used cooking oil down the drain?', 
    content: 'Pouring used cooking oil down the drain can cause serious problems. As the oil cools, it hardens and sticks to the inside of pipes, leading to clogged pipes. If the oil reaches rivers or oceans, it can block waterways and harm aquatic life by polluting the water and disrupting the ecosystem.' 
  }
]

const collectionFAQs = [
  { 
    header: 'What kind of oil do you collect?', 
    content: 'We primarily collect used cooking oils such as canola, olive, and vegetable oil. Please do not mix your cooking oil with water or other substances like motor oil or cleaning fluids, as this may contaminate the entire batch.' 
  },
  { 
    header: 'How should I prepare the oil for collection?', 
    content: 'Always let the used cooking oil cool completely before pouring it into a secure, non-breakable container with a tight-fitting lid. A clean plastic beverage bottle or glass jar works perfectly. For best results, we recommend filtering out any large food particles beforehand.' 
  },
  { 
    header: 'How much oil do I need to request a collection?', 
    content: 'We recommend storing up to at least one (1) liter before requesting a household collection.' 
  },
  { 
    header: 'How do I cancel or reschedule a collection?', 
    content: 'You can easily cancel your booking through the "Active Collections" section in the Deposit tab. Cancelling your request is not subjected to any rescheduling, but you may request another household collection that will be once again for approval.' 
  }
]




export default function FAQs() {
    const [accordionIndex, setAccordionindex] = useState<number | null>(null)

    return (
        <ScrollView contentContainerStyle={styles.faqsContainerStyle} scrollEnabled={true}>
            <Text style={styles.titleStyle}>General Questions</Text>
            <View style={{width: '88%'}}>
                { generalFAQs.map((item, index) => {
                    return (
                        <>
                            <Accordion key={index} header={item.header} content={item.content} itemIndex={index} accordionIndex={accordionIndex} setAccordionIndex={setAccordionindex}/>
                            { index < generalFAQs.length - 1 ? <View style={styles.separatorStyle} /> : null}
                        </>
                    )
                }) }
            </View>
            <Text style={[styles.titleStyle, {marginTop: '10%'}]}>Preparation and Collection</Text>
            <View style={{width: '88%', paddingBottom: '15%'}}>
                { collectionFAQs.map((item, index) => {
                    return (
                        <>
                            <Accordion key={index} header={item.header} content={item.content} itemIndex={index + 100} accordionIndex={accordionIndex} setAccordionIndex={setAccordionindex}/>
                            { index < collectionFAQs.length - 1 ? <View style={styles.separatorStyle} /> : null}
                        </>
                    )
                }) }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    faqsContainerStyle: {
        alignItems: 'center',
        paddingTop: '10%'
    },
    separatorStyle: {
        width: '90%',
        borderBottomWidth: 0.5,
        borderColor: '#D9D9D9',
        alignSelf: 'center',
        marginVertical: 10
    },
    titleStyle: {
        color: '#0E9D03',
        fontSize: 16,
        width: '88%',
        textAlign: 'left',
        marginBottom: 15,
    }
})

