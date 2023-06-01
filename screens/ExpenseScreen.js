import { Text, View } from 'react-native'
import Transaction from '../components/ui/molecules/Transaction'
import { GlobalStyles } from '../constants/styles'
import TransactionList from '../components/ui/molecules/TransactionList'
import { useEffect, useLayoutEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'

const { data } = require('../dummyData.js')

const ExpenseScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused()
  useLayoutEffect(() => {
    if (isFocused) {
      navigation.getParent().setOptions({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.expense.primary,
        },
        headerTintColor: 'white',
      })
    }
  }, [isFocused])
  return (
    <View>
      <TransactionList
        data={data.transactions.expense}
        itemBGColor={GlobalStyles.colors.expense.secondary}
      />
    </View>
  )
}

export default ExpenseScreen
