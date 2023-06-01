import { View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import TransactionList from '../components/ui/molecules/TransactionList'
import { useLayoutEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'

const { data } = require('../dummyData.js')

const IncomeScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused()
  useLayoutEffect(() => {
    if (isFocused) {
      navigation.getParent().setOptions({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.income.primary,
        },
        headerTintColor: 'white',
      })
    }
  }, [isFocused])
  return (
    <View>
      <TransactionList
        data={data.transactions.expense}
        itemBGColor={GlobalStyles.colors.income.secondary}
      />
    </View>
  )
}

export default IncomeScreen
