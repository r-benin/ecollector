import React, { ReactNode } from "react"
import { StyleSheet, View } from "react-native"
     
interface categoryTabsProps {
    children: ReactNode
}

export default function CategoryTabs({children} : categoryTabsProps) { 

    return (   
        <View style={styles.tabsContainerStyle}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    tabsContainerStyle: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 20
    },
    baseTabStyle: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#D9D9D9'
    },
    selectedTabStyle: {
        borderColor: '#0E9D03'
    }
})