
import { category, year } from "@/components/TransactionList";


import DateSelect from "@/components/DateSelect";
import TransactionItem, { transactionItemProps } from "@/components/TransactionItem";

import { useContext, useEffect, useState } from "react";
import { Image, SectionList, StyleSheet, Text, View } from "react-native";

import CategorySlot from "@/components/CategorySlots";
import CategoryTabs from "@/components/CategoryTabs";
import EmptyTransactions from "@/components/EmptyTransactions";
import { TransactionsContext } from "../_layout";

export type month = 
  | "all"
  | "january" | "January"
  | "february" | "February"
  | "march" | "March"
  | "april" | "April"
  | "may" | "May"
  | "june" | "June"
  | "july" | "July"
  | "august" | "August"
  | "september" | "September"
  | "october" | "October"
  | "november" | "November"
  | "december" | "December";

const months: month[] = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
]

const transactions: transactionItemProps[] = [
  {
    transactionId: 101,
    transactionTitle: 'UCO Collection Point Deposit',
    transactionType: 'deposit',
    transactionDate: new Date('2025-07-29T10:00:00Z'),
    transactionValue: 550.00,
  }
];

type transactionReferenceType = {
  month: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  transactions: transactionItemProps[] | []
}

type sectionData = {
  month: string,
  data: transactionItemProps[]
}

export default function HistoryScreen() {
  
  // useContext of user transactions
  const { userData, userTransactions }: any = useContext(TransactionsContext)

  // Hooks
  const categories: category[] = ['all', 'deposit', 'redeem']
  const [selectedTab, setSelectedTab] = useState(categories[0])
  const [selectedMonth, setSelectedMonth] = useState<month>('all')
  const [selectedYear, setSelectedYear] = useState<year>('2025')
  const [transactionsReference, setTransactionsReference] = useState<sectionData[]>()

  // useEffect listener for user transactions

  useEffect(() => {
    let transactionList: sectionData[] = [
      { month: 'January', data: [] },
      { month: 'February', data: [] },
      { month: 'March', data: [] },
      { month: 'April', data: [] },
      { month: 'May', data: [] },
      { month: 'June', data: [] },
      { month: 'July', data: [] },
      { month: 'August', data: [] },
      { month: 'September', data: [] },
      { month: 'October', data: [] },
      { month: 'November', data: [] },
      { month: 'December', data: [] }
    ]

    userTransactions.forEach((transaction: transactionItemProps) => {
      const transactionMonth = transaction.transactionDate.getMonth()
      const transactionYear = transaction.transactionDate.getFullYear()
      const transactionType = transaction.transactionType

      if (selectedYear === `${transactionYear}`) {
        if (selectedMonth === 'all') {
          if (selectedTab === 'all') {
            transactionList[transactionMonth].data.push(transaction)
          } else if ( selectedTab === transactionType.toLowerCase() ) {
            transactionList[transactionMonth].data.push(transaction)
          }
        } else {
          if (selectedMonth == months[transactionMonth]) {
            if (selectedTab === 'all') {
              transactionList[transactionMonth].data.push(transaction)
            } else if ( selectedTab === transactionType.toLowerCase() ) {
              transactionList[transactionMonth].data.push(transaction)
            }
          }
        }
      }
    })

    setTransactionsReference(transactionList.filter((monthlyTransaction) => { return monthlyTransaction.data.length != 0 }).reverse())
  },[userTransactions, selectedMonth, selectedTab, selectedYear])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <DateSelect
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      ></DateSelect>
      
      {/* <View style={styles.scrollViewStyle}> */}
        <SectionList
          sections={transactionsReference ? transactionsReference : []}
          ListHeaderComponent={() => {
            return (
              <CategoryTabs>
                {categories.map((category, index) => (
                    <CategorySlot key={index} tabName={
                      category === 'all' ? 'All' :
                      category === 'deposit' ? 'Deposit' :
                      category === 'redeem' ? 'Redeem' : ''
                    } onTabPress={() => setSelectedTab(category)} isSelected={category === selectedTab}/>
                ))}
              </CategoryTabs>
            )
          }}
          renderItem={({item}) => {
            return (
              <TransactionItem 
                key={item.transactionId}
                transactionId={item.transactionId}
                transactionTitle={item.transactionTitle}
                transactionDate={item.transactionDate}
                transactionType={item.transactionType}
                transactionValue={item.transactionValue}
              />
            )
          }}
          renderSectionHeader={({section: {month}}) => {
            return (
              <Text style={styles.sectionHeaderBaseStyle}>
                  <Text style={{fontWeight: 'bold'}}>{month}</Text> {selectedYear}
              </Text>
            )
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separatorStyle} />
            )
          }}
          ListEmptyComponent={() => {
            return (
              <EmptyTransactions />
            )
          }}
          ListFooterComponent={() => {
            if (transactionsReference?.length !== 0) {
              return (
                <View style={styles.hairlineContainerStyle}>
                  <View style={styles.hairlineStyle} />
                  <Image source={require("../../assets/images/ecollector-hairline-logo.png")} style={{marginRight: 10, marginLeft: 10}}></Image>
                  <View style={styles.hairlineStyle} />
                </View>
              )
            }
          }}
          style={{width: '100%', paddingHorizontal: '7.5%'}}
        />
        {/* <Text>Transactions: {JSON.stringify(userTransactions, null, 2)}</Text> */}
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeaderBaseStyle: {
    color: '#0E9D03',
    fontSize: 16,
    marginTop: 5
  },
  separatorStyle: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: '#D9D9D9',
    alignSelf: 'center'
  },
  hairlineContainerStyle: {
    width: '100%',
    marginTop: 20,
    marginBottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  hairlineStyle: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D9D9D9',
  }
})

