import TransanctionGroup from "@/components/TransactionGroup";
import { transactionItemProps } from "@/components/TransactionItem";
import TransactionList, { category, month, year } from "@/components/TransactionList";
import EmptyTransactions from "./EmptyTransactions";


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

interface historyTransactionsProps {
    transactionReference: transactionItemProps[]
    month: month
    year: year
    category?: category
    allMonths: boolean
}

export default function HistoryTransactions({ transactionReference, year, month, category, allMonths} : historyTransactionsProps) {
    const monthIndex = months.indexOf(month)
    let yearlyTransactions: transactionItemProps[] = transactionReference.filter(
          (transaction) => { return category == 'all' ? transaction.transactionDate.getFullYear().toString() == year :
            transaction.transactionDate.getFullYear().toString() == year &&
             transaction.transactionType.toLowerCase() == category
          })

    let monthlyTransactions: transactionItemProps[] = yearlyTransactions.filter(
            (monthlyTransaction) => {return (monthlyTransaction.transactionDate.getMonth() === monthIndex)}
        )

    if (allMonths) {
        if (monthlyTransactions.length !== 0) {
            return (
                <TransanctionGroup year={year} month={month}>
                    <TransactionList style={{width: '100%'}} transactionReference={monthlyTransactions} filter={{category: category}}>
                    </TransactionList>
                </TransanctionGroup>
            )
        }
    } else if (!allMonths) {
        if (monthlyTransactions.length !== 0) {
            return (
                <TransanctionGroup year={year} month={month}>
                    <TransactionList style={{width: '100%'}} transactionReference={monthlyTransactions} filter={{category: category}}>
                    </TransactionList>
                </TransanctionGroup>
            )
        } else return <EmptyTransactions />
    }
}

