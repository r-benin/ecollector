import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { Colors } from '@/constants/Colors';
import { useColorScheme } from "@/hooks/useColorScheme";

import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function RootLayout() {
  const colorScheme = useColorScheme()
  return (
      <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
              headerShown: false,
              tabBarStyle: Platform.select({
                ios: {
                  // Use a transparent background on iOS to show the blur effect
                  position: 'absolute',
                },
                default: {},
              }),
            }}>
        <Tabs.Screen name="home" options={
          {
            title: "Home",
            tabBarIcon: ({ color }) => <Feather name="home" size={24} color= { color } />
          }
        }/>
        <Tabs.Screen name="history" options={
          {
            title: "History", 
            tabBarIcon: ({ color }) => <MaterialIcons name="history" size={24} color={ color } />,
            headerStyle: {
              backgroundColor: '#0E9D03',
            },
            headerTitle: () => (
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', gap: 10}}>
                <Text style={styles.headerTitleStyle}>Transaction History</Text>
                <FontAwesome5 name="history" size={25} color="white" />
              </View>
            ),
            headerShown: true,
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          }
        }/>
        <Tabs.Screen name="deposit" options={
          {
            title: "Deposit",
            tabBarIcon: ({ color }) =>  
              <View>
                <MaterialIcons name="water-drop" size={24} color={ color }/>
              </View>,
            headerStyle: {
              backgroundColor: '#0E9D03',
            },
            headerTitle: () => (
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', gap: 5}}>
                <Text style={styles.headerTitleStyle}>Deposit</Text>
                <MaterialIcons name="water-drop" size={30} color={'white'}/>
              </View>
            ),
            headerShown: true,
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            
          }
        }/>
        <Tabs.Screen name="rewards" options={
          {
            title: "Rewards",
            tabBarIcon: ({ color }) =>  
                <Feather name="gift" size={24} color={ color } />,
            headerShown: true,
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#0E9D03',
            },
            headerTitle: () => (
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', gap: 10}}>
                <Text style={styles.headerTitleStyle}>Rewards</Text>
                <Feather name="gift" size={25} color="white" />
              </View>
            ),

          }
        }/>
        <Tabs.Screen name="me" options={
          {
            title: "Account",
            tabBarIcon: ({ color }) => <Feather name="user" size={24} color={ color }/>
          }
        }/>
      </Tabs>
  )
}

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  }
})